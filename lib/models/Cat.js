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
                cats (name, age, favoirte_treat)
            VAlUES
                ($1, $2, $3)
            RETURNING
                *
          `,
      [name, age, favoriteTreat]
    );
    return new Cat(rows[0]);
  }
};
