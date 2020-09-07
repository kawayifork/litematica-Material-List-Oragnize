var fileReader = new FileReader();
var dataList = [];
var sortData = [];
var deleted = [];
var check = [];
var date = new Date();
var comData = [];
//#region 方块
var colored = ["羊毛", "地毯", "旗帜", "床", "玻璃板", "玻璃", "带釉", "陶瓦", "粉末", "混凝", "潜影盒"];
var block2 = ["矿", "台阶", "花盆", "雪", "冰", "末地", "紫珀", "灯笼", "海晶", "锁链", "岩", "蛋糕", "菌丝", "草方块", "下界砖"];
var fence = "栅栏";
var redSt = ["漏斗", "盒", "TNT", "火把", "红石", "器", "活塞", "门", "压力板", "按钮", "拉杆", "绊线钩", "铁轨", "粘液", "蜜块", "标", "锚", "黑曜石", "磁石"];
var mob = ["蛋", "龙首", "的头", "头颅", "蜘蛛网", "骨块", "蜂", "蜜"];
var work = ["台", "炉", "机", "砂轮", "锅", "桶", "箱", "营", "钟", "铁砧", "架", "梯子", "潮涌核心"];
var block1 = ["铁", "金", "远古", "石", "块", "砖", "砂", "土", "沙"];
var plant = ["白桦", "深色", "橡木", "橡树", "云杉", "丛林", "金合欢", "绯红", "诡异", "菌", "灌木", "蕨", "花", "兰", "菊", "香", "绒球葱", "玫瑰", "向日葵", "牡丹", "蒲公英", "虞美人", "蘑菇", "竹子", "甘蔗", "仙人掌", "藤", "干草块", "瓜", "种子", "果", "豆", "疣", "下界苗", "睡莲", "珊瑚", "海带", "海泡菜", "海绵"];
var noNeed = ["基岩", "水桶", "海草", "草丛", "草径"];
var creature = plant.concat(mob);
var build = ["矿", "远古", "煤炭", "石块", "铁块", "栏杆", "锁链", "灯笼", "金块", "末地", "紫珀", "石英", "黑石", "下界砖", "下界岩", "菌岩", "玄武岩", "荧石", "岩浆块", "海晶", "安山岩", "花岗岩", "闪长岩", "平滑石", "圆石", "苔石", "石头", "石砖", "砖块", "砖", "石", "砂岩", "沙", "土", "菌丝", "草方块", "花盆", "雪", "冰", "蛋糕"];
var redStone = redSt.concat(work);
//栅栏
//旗帜 潜影盒 羊毛 地毯 床 玻璃 陶瓦 混凝

//台 炉 机 营 桶 箱 铁砧 砂轮 钟 锅 架 信标 潮涌核心 梯子
//漏斗 盒 tnt 器 红石 活塞 压力板 按钮 拉杆 绊线钩 门 铁轨 粘液 蜜块

//矿 铁 金 块 石 砂 岩 砖 土 沙
//末地 灯 下界 花盆 雪 冰 蛋糕

//头 蜘蛛网 海 蜂 蜜 蛋
//树 木 菌 草 蕨 兰 菊 香 绒球葱 玫瑰 向日葵 牡丹 蒲公英 虞美人 竹子 甘蔗 藤 睡莲 珊瑚 果 豆 仙人掌 蘑菇 海绵 瓜

//基岩 水桶
//#endregion

$(document).ready(function () {
    $("#file").change(function (event) {
        let files = event.target.files;
        let fileName = files[0].name;
        // 数据
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
        let text = "材料  数量  组  潜影盒  潜影盒箱\r\n";
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
        if (Number(count) > 0 && !findItem(item, noNeed)) {
            newData.push({ "item": item, "count": count });
        }
    }
    dataList = newData;
    sortItem();
    sortData.reverse();
    //console.log(sortData);
    //console.log(dataList);
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

//#region 选项
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

//#region 显示
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

//#region 分类
function sortItem() {
    sortData = [];
    for (let data of dataList) {
        let item = data.item;
        let count = data.count;
        if (findItem(item, colored)) {
            sortData.push({ "item": item, "count": count, "type": "colored" });
        } else if (findItem(item, block2)) {
            sortData.push({ "item": item, "count": count, "type": "build" });
        } else if (item.includes(fence)) {
            sortData.push({ "item": item, "count": count, "type": "creature" });
        } else if (findItem(item, redSt)) {
            sortData.push({ "item": item, "count": count, "type": "redStone" });
        } else if (findItem(item, mob)) {
            sortData.push({ "item": item, "count": count, "type": "creature" });
        } else if (findItem(item, work)) {
            sortData.push({ "item": item, "count": count, "type": "redStone" });
        } else if (findItem(item, plant)) {
            sortData.push({ "item": item, "count": count, "type": "creature" });
        } else if (findItem(item, block1)) {
            sortData.push({ "item": item, "count": count, "type": "build" });
        }
    }
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
function isItem1(item, array) {
    let exist = false;
    for (let data of array) {
        if (item == data.item) {
            exist = true;
            break;
        }
    }
    return exist;
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
                                let id = "#" + i;
                                let id1 = "#t" + i;
                                $(id).prop("checked", true)
                                $(id1).css("background-color", "grey");
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

//#region 导出
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

// 测试比较（防止遗漏物品）
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
