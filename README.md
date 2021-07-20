# litematica Material List Oragnize
A simple tool for oragnizing litematica material list. Can work with 1.17.1 new blocks.

Supported Browsers
--
Firefox 20+, Opera 15+, Chrome (I guess Safari 10.1+ could work, but I didn't test for that)

Functions
--
- Does not include Water Bucket, Seagrass ,Grass amd other blocks that cannot get in survival.
- Covnert the Grass_Path into Grass.
- Only count the missing block and automatically turns into Stack, ShulkerBox, ShulkerChest.
- Can choose to highlight the block with over how many ShulkerBox.
- Can delete the block and add the deleted block back to the table.
- Can select to mark down the block(deleted block cannot be selected but the mark one still remains the mark status when adding back from the deleted table).
- Can save the table as .png OR .txt
- Can switch to sort by Count or sort by Kind(the delete/ marked info still remains).

How to Use
--
- Please save the material list into .csv(press SHIFT) in the mod GUI and don't revise the content or the fileReader cannot read the file properly.
- After uploading the file, you can select how sort and how many shulkerbox of block need to highlight(if don't need to highlight, you can input a larger number), then click the load button.
- Please click load button after changing the selections.
- The first table is the material list, the second one is the deleted list.
- The red X is to delete, the checkbox is to mark down and the red + is to add the deleted block back to the list.
- The sort by kind option is dividing the blocks into 4 parts and colored in the table:
1. Dyed - as it means
2. Creatures - plants and mob related block
3. Builds - as it means
4. Redstone - redstone, work block, and some tool block

Reference:
--
Screencapture: https://github.com/niklasvh/html2canvas

txt file save：https://github.com/eligrey/FileSaver.js

# 
Thanks for Aschin for helping and many greatful advices.

Feel free to rewrite it into your language, just need to mark my name on it and let me know.

You only need to rewrite the arrays in '#region Block' and Grass_Path and Grass in 'sortItem()'.
You can also change the sort logic in the 'sortItem()' if needed.
