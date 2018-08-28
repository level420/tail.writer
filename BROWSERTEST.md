Unit Browser Test
=================
-	✔: Means we support this browser (so it should work)!
-	✘: Means we don't support this browser (even if it may works)!

General Informations
--------------------
Please check if we support the browser here BEFORE you report a bug. If we support the browser, then
please don't forget the following informations if you open an issue:

-	Your OS (+ Version)
-	Your Browser (+ Version)
-   Used Version (+ respective libraries)

Thanks! :3

PS.: The tail.writer script is currently **NOT SUPPORTED** on mobile devices!

Google Chrome
-------------
-	Latest Chrome version has been tested on Windows 7.

| Browser    | Version 0.3.0     |
| ---------- |:-----------------:|
| 68.0.*     | ✔                 |
| 60.0.*     | ✔                 |
| 57.0.*     | ✔                 |
| 56.0.*     | ✔                 |

#### Notes
-	I didn't found an easy way to test previous versions. :(

Opera Browser
-------------
-	All Opera versions has been tested on Windows 7.

| Browser    | Version 0.3.0     |
| ---------- |:-----------------:|
| 44.0.*     | ✔                 |
| 12.0.0     | ✘ (1)             |

#### Notes
-	(1) It doesn't work very well, some functions are broken!

Mozilla Firefox
---------------
-	All Firefox versions has been tested on Windows 7. (Thanks to [utilu.com](https://utilu.com/))

| Browser    | Version 0.3.0     |
| ---------- |:-----------------:|
| 61.0.*     | ✔                 |
| 60.0.*     | ✔                 |
| 52.0.*     | ✔                 |
| 42.0.*     | ✔                 |
| 21.0.*     | ✔                 |
| 14.0.*     | ✔                 |
| 7.0.*      | ✔                 |
| 4.0.*      | ✘ (1)             |
| 3.6.*      | ✘ (1)             |

#### Notes
-	(1) It works almost flawless!

Other Browsers
--------------
-	All Browsers below has been tested on Windows 7.

| Browser       | Version 0.3.0     |                                     |
| ------------- |:-----------------:|:-----------------------------------:|
| Vivaldi 1.8   | ✔                 | [Check it out](https://vivaldi.com) |

#### Notes
-	Did you noticed that "Other Browsers" are still above IE? Be smart and don't use IE!

Internet Explorer
-----------------
-	IE 8 - IE 11 has been tested on Windows 7 within [VirtualBox](https://www.virtualbox.org/)!

| Browser    | Version 0.3.0     |
| ---------- |:-----------------:|
| MS Edge    | ✘ (1)             |
| MS IE 11   | ✔                 |
| MS IE 10   | ✔                 |
| MS IE 9    | ✔                 |
| MS IE 8    | ✘ (2)             |

#### Notes
-	(1) MS Edge should work, but my hardware is to slow for testing / debugging! :(
-	(2) IE 8 - IE 11 doesn't support `tab-size`, use `indent_tab: false` to convert tabs into spaces.
