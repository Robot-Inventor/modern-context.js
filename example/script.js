import { Context } from "../dist/modern-context.js";

const contents = [
    {
        type: "item",
        label: "Alert",
        callback: () => {
            alert("Clicked!");
        }
    },
    {
        type: "separator"
    },
    {
        type: "item",
        label: "No Callback"
    }
];
const context = new Context("#target", contents);

for (let i = 0; i < 2; i++) {
    context.addSeparator();
    for (let j = 0; j < 4; j++) {
        context.addItem(`Item${j}`);
    }
}
