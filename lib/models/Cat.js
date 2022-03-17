const cats = require('../controllers/cats');
const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  favoriteTreat;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.favoriteTreat = row.favorite_treat;
  }
    
  static async insert({ name, age, favoriteTreat }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                cats (name, age, favorite_treat)
            VAlUES
                ($1, $2, $3)
            RETURNING
                *
          `,
      [name, age, favoriteTreat]
    );
    return new Cat(rows[0]);
  }
    
  static async findAll() {
    const { rows } = await pool.query(
      `
            SELECT
                *
            FROM
                cats
            `
    );
    return rows.map((row) => new Cat(row));
  }
    
  static async findById(id) {
    const { rows } = await pool.query(
      `
            SELECT
                *
            FROM
                cats
            WHERE
                id=$1
          `,
      [id]
    );
    return new Cat(rows[0]);
  }
    
  static async updateById(id, attributes) {
    const existingCat = await Cat.findById(id);
    const updatedAttributes = { ...existingCat, ...attributes };
    const { name, age, favoriteTreat } = updatedAttributes;
    const { rows } = await pool.query(
      `
    UPDATE
        cats
    SET
        name=$1,
        age=$2,
        favorite_treat=$3
    WHERE
        id=$4
    RETURNING
        *
      `,
      [name, age, favoriteTreat, id]
    );
      
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            cats
        WHERE
            id=$1
        RETURNING
            *
        `,
      [id]
    ); 
    return new Cat(rows[0]);  
  }
};
