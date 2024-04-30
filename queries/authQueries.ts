
const verifyUserQuery = 'SELECT * FROM details where name=$1 AND password=$2';

const creatUserQuery = 'INSERT INTO details (name, password, role) VALUES($1, $2, $3) RETURNING uid';

export {creatUserQuery, verifyUserQuery};