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

    const tableRows = [];
    let currentRow = [];
    for (const cell of tableCells) {        
        if (currentRow.length === 2) {
            tableRows.push(
                new TableRow({
                    children: currentRow,
                    cantSplit: true
                })
            );
            currentRow = [];
        }
        currentRow.push(cell);
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