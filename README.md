# Karnaugh-Map
Minimization of Boolean functions using Karnaugh's map website.
Made By - Itamar Ben-Atar 2021.

Project is not completed yet, but is still useable - to use click on "View" in google chrome headbar, and then "Develepor"->"Develepor Tools",
after putting in inputs of "1" and "0" (also "-1" for dont-care), you can see in the console the minimal exspressions.
Guide to reading it -
**col: starting coloumn.
**row: starting row.
**i: the number of squares downward that are included in this minterm.
**j: the number of squares left that are included in this minterm.
**mul: the total size of this minterm.

*optional - if looking at arr named "same" - two more fields:
**symcol - if the minterm is symmetrical through the x-axis.
**symrow - if the minterm is symmetrical through the y-axis.
