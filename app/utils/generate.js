import { Document, Table, Paragraph, TextRun, TableRow, TableCell, HeadingLevel, Hyperlink, HyperlinkRef } from "docx";

const generateOrdersDoc = (orders, profileLinks) => {
    const doc = new Document({
        hyperlinks: profileLinks
    });

    const tableCells = Object.keys(orders).map(name => {
        const heading = new Paragraph({
            text: name,
            heading: HeadingLevel.HEADING_2
        });
        const profileLink = new Paragraph({
            children: [
                new HyperlinkRef(name)
            ]
        });
        const bullets = orders[name].map(order => (
            new Paragraph({
                text: order,
                bullet: {level: 0}
            })
        ));

        return new TableCell({
            children: [heading, profileLink, ...bullets]
        });
    });

    // group the table cells into pairs so that the table has two cells per row
    const pairs = tableCells.reduce((result, _, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, []);

    const tableRows = [];
    for (const pair of pairs) {
        tableRows.push(
            new TableRow({
                children: pair,
                cantSplit: true
            })
        );
    }

    const table = new Table({
        rows: tableRows
    });

    doc.addSection({
        properties: {},
        children: [table]
    });

    return doc;
};

export default generateOrdersDoc;