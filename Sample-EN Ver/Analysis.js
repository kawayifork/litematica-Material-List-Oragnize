var fileReader = new FileReader();
var dataList = [];
var sortData = [];
var sorted = false;
var deleted = [];
var check = [];
var date = new Date();
var comData = [];
//#region Block
var colored = ["Wool", "Carpet", "Banner", "Bed", "Pane", "Glass", "Powder", "Concrete", "Glazed", "Terracotta", "Shulker"];
var work = ["Table", "Stand", "Lectern", "Furnace", "Smoker", "Loom", "Cutter", "Cauldron", "Grind", "Composter", "Barrel", "Chest", "box", "Anvil", "Bell", "Campfire", "shelf", "Scaffolding", "Ladder", "Beacon", "Conduit"];
var block2 = ["Brick", "Andesite", "Nylium", "Pot", "Lantern", "Basalt", "Ice", "Quartz", "End", "Purpur", "Chain", "Cake"];
var redSt = ["Hopper", "Note", "TNT", "Torch", "Redstone", "Detector", "Dropper", "Dispenser", "Observer", "Piston", "oor", "Pressure", "Button", "Lever", "Tripwire", "String", "Rail", "Slime", "Honey Block", "Target", "Respawn", "Obsidian", "Lode"];
var plant = ["Birch", "Dark Oak", "Oak", "Spruce", "Jungle", "Acacia", "Crimson", "Warped", "Dead Bush", "Fern", "Rose", "Allium", "Azure", "Orchid", "Dandelion", "lower", "Tulip", "Daisy", "Peony", "Poppy", "Lil", "hroom", "Bamboo", "Cane", "Cactus", "Vines", "Bale", "Melon", "Pumpkin", "Jack", "Seed", "Sweet","Cocoa", "Sprouts", "Chorus", "Coral", "Kelp", "Pickle", "Sponge"];
var block1 = ["Block", "Clay", "tone", "Sand", "Soil", "Ore", "Bar", "Nether", "Dirt", "Prismarine", "Podzol", "Mycelium", "Granite", "Gravel", "Diorite", "Ancient"];
var mob = ["Bee", "comb", "Cobweb", "Head", "Egg", "Skull", "Bone"];
var creature = plant.concat(mob);
var build = ["Ore", "Ancient", "Block of", "Lapis","Bars", "Chain", "Lantern", "End", "Purpur", "Quartz", "Blackstone", "Nether", "Nylium", "Basalt", "Glowstone", "Magma", "Prismarine", "Andesite", "Granite", "Diorite", "Smooth Stone", "Mossy", "Cobble", "Brick", "Stone", "Sandstone", "Sand", "Soil", "Dirt", "Podzol", "Mycelium", "Grass Block", "Gravel", "Clay", "Pot", "Snow", "Ice", "rack", "Cake"];
var redStone = redSt.concat(work);
//Banner Bed Carpet Concrete Terracotta Shulker Glass Wool 

//Rail Barrel Button Bell Cauldron Chest Detector Hooper Composter Obsidian Dispenser Dropper Pressure door box Lectern Lever Piston Observer Redstone Respawn Slime TNT Target Tripwire
//Beacon Furnace shelf Stand Campfire Table Conduit Ladder Loom Scaffolding Smoker Torch Anvil

//Acacia Birch Oak Jungle Spruce Crimson Warped Bush
//Allium Azure Orchid Dandelion lower Lil Tulip Daisy Peony Poppy Rose Bamboo Coral hroom Cactus Chorus Melon Pumpkin Jack Cocoa Fern Grass Bale Kelp Pickle Sponge Cane Vines

//Block Clay tone Brick Ore Iron Dirt Nylium Prismarine Podzol Mycelium Granite Gravel Diorite Ancient 
//Andesite Lantern Basalt Ice Nether Quartz End Purpur Cake 

//Bee Cobweb Head Egg Skull

//#endregion
$(document).ready(function () {
    $("#file").change(function (event) {
        let files = event.target.files;
        let fileName = files[0].name;
        // Data
        fileReader.readAsText(files[0], "gbk");
        fileReader.onload = () => {
            dataList = fileReader.result.split('\n');
            dataList.pop();
            getDataList();
        }
        $("#fileDisplay").append("<li>" + fileName + "</li>");
        $("#file").remove();
    });
    $("#pic").click(function () {
        $(".option").hide();
        getPic(document.getElementById('material'));
    });
    $("#text").click(function () {
        let text = "Block  Count  Stack  ShulkerBox  ShulkerChest\r\n";
        if (sorted) {
            text += textSort("colored", colored);
            text += textSort("creature", creature);
            text += textSort("build", build);
            text += textSort("redStone", redStone);
        } else {
            for (let data of sortData) {
                text += data.item + ", " + data.count + ", " + fixed(set(data.count)) + ", " + fixed(shulkBox(data.count)) + ", " + fixed(shulkChest(data.count)) + "\r\n";
            }
        }
        //console.log(text);
        let file = new File([text], date + ".txt", { type: "text/plain;charset=utf-8" });
        saveAs(file);
    });
});
function getDataList() {
    let newData = new Array();
    for (let i = 1; i < dataList.length; i++) {
        let data = dataList[i].replace(/"/g, "");
        let item = data.slice(0, data.indexOf(","));
        let count0 = data.slice(data.indexOf(",") + 1);
        let count = count0.slice(count0.indexOf(",") + 1, count0.lastIndexOf(","));
        if (Number(count) > 0) {
            newData.push({ "item": item, "count": count });
        }
    }
    dataList = newData;
    sortItem();
    sortData.reverse();
}

function getDataTable() {
    let sort = $("input[name = 'sort']:checked").val();
    let sb = Number($("#sb").val());
    $(".unsorted").remove();
    $(".colored").remove();
    $(".creature").remove();
    $(".build").remove();
    $(".redStone").remove();
    if (sortData.length > 0) {
        $("#material").css("display", "inline-block");
        $(".option").show();
        if (sort == "count") {
            sorted = false;
            sortData.sort(function (a, b) { return Number(b.count) - Number(a.count); });
            for (let i = 0; i < sortData.length; i++) {
                $("#material").append("<tr class = 'select unsorted' id = 't" + i + "'><td class = 'option'><span onclick = 'deleteRow(" + i + ");'>X</span></td><td>" + sortData[i].item + "</td><td>" + sortData[i].count + "</td><td>" + fixed(set(sortData[i].count)) + "</td><td>" + fixed(shulkBox(sortData[i].count)) + "</td><td>" + fixed(shulkChest(sortData[i].count)) + "</td><td class = 'option'><input type = 'checkbox' onclick = 'done(" + i + ");' id = " + i + " ></td></tr>");
                highlight(i, sb);
                for (let data of check) {
                    if (sortData[i].item == data.item) {
                        let id = "#" + i;
                        let id1 = "#t" + i;
                        $(id).prop("checked", true)
                        $(id1).css("background-color", "grey");
                    }
                }
            }
            if (deleted.length > 0) {
                $("#deleted").css("display", "inline-block");
                for (let i = 0; i < deleted.length; i++) {
                    $("#deleted").append("<tr class = 'select unsorted'><td><span onclick = 'addRow(" + i + ");'>+</span></td><td>" + deleted[i].item + "</td><td>" + deleted[i].count + "</td><td>" + fixed(set(deleted[i].count)) + "</td><td>" + fixed(shulkBox(deleted[i].count)) + "</td><td>" + fixed(shulkChest(deleted[i].count)) + "</td></tr>");
                }
            } else {
                $("#deleted").css("display", "none");
            }
        } else {
            //console.log(sortData);
            sorted = true;
            if (deleted.length > 0) {
                $("#deleted").css("display", "inline-block");
                tableSort("colored", 3, colored);
                tableSort("creature", 3, creature);
                tableSort("build", 3, build);
                tableSort("redStone", 3, redStone);
            } else {
                $("#deleted").css("display", "none");
            }
            tableSort("colored", 1, colored);
            tableSort("creature", 1, creature);
            tableSort("build", 1, build);
            tableSort("redStone", 1, redStone);
        }
        $(".save").css("display", "inline-block");
        //compare();
        //compare1();
    }
}

//#region Options
function deleteRow(i) {
    let newData = new Array();
    for (let data of sortData) {
        if (data.item == sortData[i].item) {
            deleted.push(data);
        } else {
            newData.push(data);
        }
    }
    sortData = newData;
    getDataTable();
}
function addRow(i) {
    let newData = new Array();
    //sortData.reverse();
    for (let data of deleted) {
        if (data.item == deleted[i].item) {
            sortData.push(data);
        } else {
            newData.push(data);
        }
    }
    deleted = newData;
    console.log(deleted);
    getDataTable();
}
function done(i) {
    let id = "#" + i;
    let id1 = "#t" + i;
    let sb = Number($("#sb").val());
    let newData = new Array();
    if ($(id).prop("checked")) {
        $(id1).css("background-color", "grey");
        check.push(sortData[i]);
    } else {
        if (shulkBox(sortData[i].count) >= sb) {
            $(id1).css("background-color", "rgb(240, 216, 237)");
        } else {
            console.log(shulkBox(sortData[i].count));
            $(id1).css("background-color", "white");
        }
        for (let data of check) {
            if (data.item == sortData[i].item) {
                console.log(data);
            } else {
                newData.push(data);
            }
        }
        check = newData;
    }
}
//#endregion

//#region Display
function set(count) {
    return Number(count) / 64;
}
function shulkBox(count) {
    return Number(count) / (64 * 27);
}
function shulkChest(count) {
    return Number(count) / (64 * 27 * 27);
}
function fixed(number) {
    if (number.toFixed(2) == 0.00) {
        return 0;
    } else {
        return number.toFixed(2);
    }
}
function highlight(i, sb) {
    let id = "#t" + i;
    if (shulkBox(sortData[i].count) >= sb) {
        $(id).css("background-color", "rgb(240, 216, 237)");
    }
}
//#endregion

//#region Sort
function sortItem() {
    let newData = new Array();
    sortData = [];
    for (let data of dataList) {
        let item = data.item;
        let count = data.count;
        if (findItem(item, colored)) {
            sortData.push({ "item": item, "count": count, "type": "colored" });
        } else if (findItem(item, block2)) {
            sortData.push({ "item": item, "count": count, "type": "build" });
        } else if (findItem(item, redStone)) {
            sortData.push({ "item": item, "count": count, "type": "redStone" });
        } else if (findItem(item, creature)) {
            sortData.push({ "item": item, "count": count, "type": "creature" });
        } else if (findItem(item, block1)) {
            sortData.push({ "item": item, "count": count, "type": "build" });
        } else if (item == "Grass Path") {
            newData.push({ "item": "Grass Block", "count": count, "type": "build" });
        }
    }
    path2Grass(newData);
}
function findItem(item, array) {
    let exist = false;
    for (let element of array) {
        if (item.includes(element)) {
            exist = true;
            break;
        }
    }
    return exist;
}
function path2Grass(array) {
    let exist = false;
    if (array.length > 0) {
        for (let data of sortData) {
            if (data.item == array[0].item) {
                data.count = (Number(array[0].count) + Number(data.count)).toString();
                exist = true;
            }
        }
        if (!exist) {
            sortData.push(array[0]);
        }
    }
}
function isItem(item, array) {
    let exist = true;
    for (let data of array) {
        if (item == data.item) {
            exist = false;
            break;
        }
    }
    return exist;
}
function tableSort(type, n, array) {
    let id = "#" + type + n;
    let sb = Number($("#sb").val());
    let newData = new Array();
    sortData.sort(function (a, b) { return Number(b.count) - Number(a.count); });
    if (n == 1) {
        for (let x = 0; x < array.length; x++) {
            for (let i = 0; i < sortData.length; i++) {
                if (sortData[i].type == type) {
                    let item = sortData[i].item;
                    if (item.includes(array[x]) && isItem(item, newData)) {
                        $(id).before("<tr class = 'select " + type + "' id = 't" + i + "'><td class = 'option'><span onclick = 'deleteRow(" + i + ");'>X</span></td><td>" + sortData[i].item + "</td><td>" + sortData[i].count + "</td><td>" + fixed(set(sortData[i].count)) + "</td><td>" + fixed(shulkBox(sortData[i].count)) + "</td><td>" + fixed(shulkChest(sortData[i].count)) + "</td><td class = 'option'><input type = 'checkbox' onclick = 'done(" + i + ");' id = " + i + "></td></tr>");
                        newData.push(sortData[i]);
                        comData.push(sortData[i]);
                        highlight(i, sb);
                        for (let data of check) {
                            if (sortData[i].item == data.item) {
                                let id1 = "#" + i;
                                let id2 = "#t" + i;
                                $(id1).prop("checked", true)
                                $(id2).css("background-color", "grey");
                            }
                        }
                    }

                }
            }
        }
    } else {
        console.log(deleted);
        for (let i = 0; i < deleted.length; i++) {
            if (deleted[i].type == type) {
                $(id).after("<tr class = 'select " + type + "'><td><span onclick = 'addRow(" + i + ");'>+</span></td><td>" + deleted[i].item + "</td><td>" + sortData[i].count + "</td><td>" + fixed(set(deleted[i].count)) + "</td><td>" + fixed(shulkBox(deleted[i].count)) + "</td><td>" + fixed(shulkChest(deleted[i].count)) + "</td></tr>");
            }
        }
    }

}
//#endregion

//#region Save
function getPic(element) {
    html2canvas(element).then(function (canvas) {
        canvas.toBlob(function (blob) {
            saveAs(blob, date + ".png")
        });
    });
}
function textSort(type, array) {
    let str = "";
    let newData = new Array();
    sortData.sort(function (a, b) { return Number(b.count) - Number(a.count); });
    for (let x = 0; x < array.length; x++) {
        for (let data of sortData) {
            if (data.type == type) {
                let item = data.item;
                if (item.includes(array[x]) && isItem(item, newData)) {
                    str += data.item + ", " + data.count + ", " + fixed(set(data.count)) + ", " + fixed(shulkBox(data.count)) + ", " + fixed(shulkChest(data.count)) + "\r\n";
                    newData.push(data);
                }
            }
        }
    }
    return str;
}
//#endregion

//#region Compare test(to avoid missing block)
// the data read from the file
function compare() {
    let uninvloved = new Array();
    let invloved = new Array();
    let items = new Array();
    for (let element of sortData) {
        items.push(element.item);
    }
    for (let data of dataList) {
        if (items.includes(data.item)) {
            invloved.push(data);
        } else {
            uninvloved.push(data);
        }
    }
    console.log(uninvloved);
}
// the data sorted in the table
function compare1() {
    let uninvloved = new Array();
    let invloved = new Array();
    let items = new Array();
    for (let element of comData) {
        items.push(element.item);
    }
    for (let data of sortData) {
        if (items.includes(data.item)) {
            invloved.push(data);
        } else {
            uninvloved.push(data);
        }
    }
    console.log(uninvloved);
}
//#endregion