const oracledb = require('oracledb');
const data = new Array();
var result;

const localhost = 'localhost'

// Main Sql Quarys
const select = async(rowName, tableName) =>{
  result = `select ${rowName} from ${tableName}`
}
const update = async (table, dataUpdate) => {
  result = `UPDATE ${table} SET ${dataUpdate}`
}
const remove = async (table) => {
  result = `DELETE FROM ${table}`
}
const insert = async (table, columns, values) => {
  result = `INSERT INTO ${table} (${columns}) VALUES (${values})`
}

// SQl Quarys Halper
const where = async(rowName, operation, val) => {
  result += ` where ${rowName} ${operation} ${val}`
}
const and = async(rowName, operation, val) => {
  result += ` and ${rowName} ${operation} ${val}`
}
const otherOperation = async(operation) => {
  result += ` ${operation} `
}
const otherWhere = async(rowName, operation, val) => {
  result += `${rowName} ${operation} ${val}`
}
const openOtherSelect = async(rowName, tableName) => {
  result += `(select ${rowName} from ${tableName}`
}
const openArch = async() => {
  result += `(`
}
const closeArch = async() => {
  result += `)`
}
const closeOtherSelect = async() => {
  result += `)`
}
const innerJoin = async(secandTable, firstTable,secondsimbol, commanColumn) => {
  result += ` INNER JOIN ${secandTable} ON ${firstTable}.${commanColumn} = ${secondsimbol}.${commanColumn} `
}
const leftJoin = async(secandTable, firstTable,secondsimbol, commanColumn ) => {
  result += ` LEFT JOIN ${secandTable} ON ${firstTable}.${commanColumn} = ${secondsimbol}.${commanColumn} `
}
const leftJoinWithDiffColumn = async(secandTable, firstTable,secondsimbol, commanColumn, commanColumn2 ) => {
  result += ` LEFT JOIN ${secandTable} ON ${firstTable}.${commanColumn} = ${secondsimbol}.${commanColumn2} `
}
const rightJoin = async(secandTable, firstTable,secondsimbol, commanColumn ) => {
  result += ` RIGHT JOIN ${secandTable} ON ${firstTable}.${commanColumn} = ${secondsimbol}.${commanColumn} `
}
const fullJoin = async(secandTable, firstTable,secondsimbol, commanColumn ) => {
  result += ` FULL JOIN ${secandTable} ON ${firstTable}.${commanColumn} = ${secondsimbol}.${commanColumn} `
}
const orderBY = async(columnName,sortType ) => {
  result += ` order by ${columnName} ${sortType} `
}
const groupBy = async(columnName) => {
  result += ` group by ${columnName} `
}

// Sql Quarys Executions
async function all() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "Auction", password: "Auction", connectionString: `${localhost}:1521/xe`});
    console.log(result)
    console.log("Successfully connected to Oracle Database");

    // Now query the rows back

    output = await connection.execute(
      `${result}`,
      [],
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

    const rs = output.resultSet;
    let row;

    while ((row = await rs.getRow())) {
        data.push(row)
    }

    await rs.close();
    

  } catch (err) {
    console.error(err);
    console.log(result)
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
async function execute() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "Auction", password: "Auction", connectionString: `${localhost}:1521/xe` });
    console.log(result)
    console.log("Successfully connected to Oracle Database");
    output = await connection.execute(`${result}`,
    [],
    { resultSet: true, autoCommit:true, outFormat: oracledb.OUT_FORMAT_OBJECT })
    output.rowsAffected == 0 ?
    data.push('FAILED')
    :
    data.push('SUCCESSED')
    result = ''

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Exports Functions
module.exports.select = select
module.exports.update = update
module.exports.insert = insert
module.exports.where = where
module.exports.and = and
module.exports.otherOperation = otherOperation
module.exports.otherWhere = otherWhere
module.exports.openOtherSelect = openOtherSelect
module.exports.openArch = openArch
module.exports.closeArch = closeArch
module.exports.closeOtherSelect = closeOtherSelect
module.exports.innerJoin = innerJoin
module.exports.leftJoin = leftJoin
module.exports.leftJoinWithDiffColumn = leftJoinWithDiffColumn
module.exports.rightJoin = rightJoin
module.exports.fullJoin = fullJoin
module.exports.orderBY = orderBY
module.exports.groupBy = groupBy
module.exports.remove = remove
module.exports.all = all
module.exports.execute = execute
module.exports.data = data