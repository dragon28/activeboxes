import { createAction, Property } from "@activepieces/pieces-framework";
import { mysqlCommon, mysqlConnect, isSpecialColumn } from "../common";

export default createAction({
    name: 'select_rows',
    displayName: 'Select Rows',
    description: 'Reads rows from a table',
    props: {
        authentication: mysqlCommon.authentication,
        timezone: mysqlCommon.timezone,
        table: mysqlCommon.table(),
        condition: Property.ShortText({
            displayName: 'Condition',
            required: true
        }),
        args: Property.Array({
            displayName: 'Args',
            description: 'Arguments can be used using ? in the condition',
            required: false
        }),
        columns: Property.Array({
            displayName: 'Columns',
            description: 'Specify the columns you want to select',
            required: false
        }),
    },
    async run(context) {
        const columns = context.propsValue.columns as string[] || ['*']
        const qsColumns = columns.map(c => isSpecialColumn(c) ? c : ("`" + c + "`")).join(',')
        const qs = "SELECT " + qsColumns + " FROM `" + context.propsValue.table + "` WHERE " + context.propsValue.condition + ";"
        const conn = await mysqlConnect(context.propsValue);
        try {
            const results = await conn.query(qs, context.propsValue.args)
            await conn.end()
            return { results }
        } catch(e) {
            await conn.end()
            throw e
        }
    }
})