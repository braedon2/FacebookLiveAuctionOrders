import { parseOrders, parseProfileLinks } from "../utils/parse";
import testData from "./testData";

test('parse orders, new design, full comment section', () => {
    const names = [
        "Laura Frasher", "Jenee Powell", "Chip Kadlec", "Richard Radillo",
        "Kaleigh Dieterle", "Linda Bakken", "Donna Halden", "Faizah Naeem",
        "Melinda McGraw", "Jimmy Blanchette", "Leah Snyder",
        "Brandi Gypsy Smith", "Jon Snow"
    ];

    const orders = parseOrders(testData.newDesign1, "new");

    console.log(orders);
    
    expect(Object.keys(orders).sort()).toEqual(names.sort());

    expect(orders["Laura Frasher"].length).toBe(15);
    expect(orders["Jenee Powell"].length).toBe(3);
    expect(orders["Chip Kadlec"].length).toBe(3);
    expect(orders["Richard Radillo"].length).toBe(5);
    expect(orders["Kaleigh Dieterle"].length).toBe(8);
    expect(orders["Linda Bakken"].length).toBe(1);
    expect(orders["Donna Halden"].length).toBe(4);
    expect(orders["Faizah Naeem"].length).toBe(7);
    expect(orders["Melinda McGraw"].length).toBe(2);
    expect(orders["Jon Snow"].length).toBe(2);
    expect(orders["Jimmy Blanchette"].length).toBe(2);
    expect(orders["Leah Snyder"].length).toBe(2);
    expect(orders["Brandi Gypsy Smith"].length).toBe(2);
});

test('parse orders, new design, missing name', () => {
    const orders = parseOrders(testData.newDesign2, "new");

    console.log(orders);

    expect(orders.warning).toBe('could not associate name with order: "1 large dragon rainbow 57.50"')
});

test('parse profile links, new design, full comment section', () => {
    const names = [
        "Laura Frasher", "Jenee Powell", "Chip Kadlec", "Richard Radillo",
        "Kaleigh Dieterle", "Linda Bakken", "Donna Halden", "Faizah Naeem",
        "Melinda McGraw", "Jimmy Blanchette", "Leah Snyder",
        "Brandi Gypsy Smith", "Jon Snow"
    ];

    const profileLinks = parseProfileLinks(testData.newDesignHtml1, names);

    console.log(profileLinks);

    expect(Object.keys(profileLinks).sort()).toEqual(names.sort());
});