module.exports = {
    INSERT_QUERY: (table, insertion) => {
        let insertString = "";
        for (let arg in insertion)
            insertString += `'${insertion[arg]}',`;
        insertString = insertString.substring(0, insertString.length - 1);
        return (`INSERT INTO ${table} VALUES (${insertString});`);
    },
    SELECT_WHERE_QUERY: (table, number, where_condition) => {
        return (`SELECT ${number} FROM ${table} WHERE ${where_condition};`);
    },
    SELECT_QUERY: (table, number) => {
        return (`SELECT ${number} FROM ${table};`);
    },
    UPDATE_QUERY_USER: (table, user) => {
        return (`UPDATE ${table} SET username='${user.username}', password='${user.password}', email='${user.email}', action='${areaParser.fromListToParse(user.action)}', reaction='${areaParser.fromListToParse(user.reaction)}', 
link='${JSON.stringify(Object.fromEntries(user.linked))}' WHERE id='${user.uuid}';`);
    }
}