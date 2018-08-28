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
-	Used jS Library (jQuery or MooTools) (+ Version)
-	Used Edition (jQuery or MooTools) (+ Version)

Thanks! :3

PS.: The tail.writer script is **NOT SUPPORTED** on mobile devices!

### Used Libraries
The following library versions have been used within the following tests:

#### jQuery
-	Version 3.2.0
-	Version 3.1.1
-	Version 2.2.4
-	Version 1.12.4
-	Version 1.8.0

#### MooTools
-	Version 1.6.0
-	Version 1.5.2
-	Version 1.4.5

Google Chrome
-------------
-	Latest Chrome version has been tested on Windows 7.

| Version    | jQuery >= 1.8.0   | MooTools >= 1.4.5 |
| ---------- |:-----------------:|:-----------------:|
| 57.0.*     | ✔                | ✔                |
| 56.0.*     | ✔                | ✔                |

#### Notes
-	I didn't found an easy way to test previous versions. :(

Opera Browser
-------------
-	All Opera versions has been tested on Windows 7.

| Version    | jQuery >= 1.8.0   | MooTools >= 1.4.5 |
| ---------- |:-----------------:|:-----------------:|
| 44.0.*     | ✔                | ✔                |
| 12.0.0     | ✘(1)             | ✘(1)             |

#### Notes
-	(1) It doesn't work very well, some functions are broken!

Mozilla Firefox
---------------
-	All Firefox versions has been tested on Windows 7. (Thanks to [utilu.com](https://utilu.com/))

| Version    | jQuery >= 1.8.0   | MooTools >= 1.4.5 |
| ---------- |:-----------------:|:-----------------:|
| 52.0.2     | ✔                | ✔                |
| 42.0.0     | ✔                | ✔                |
| 21.0.0     | ✔                | ✔                |
| 14.0.1     | ✔                | ✔                |
| 7.0.1      | ✔                | ✔                |
| 4.0.1      | ✘(1)             | ✘(1)             |
| 3.6.28     | ✘(1)             | ✘(1)             |

#### Notes
-	(1) It works wonderful with jQuery (1.8.0 only!) and all MooTools versions, but we don't support it!

Other Browsers
--------------
-	All Browsers below has been tested on Windows 7.

| Version       | jQuery >= 1.8.0   | MooTools >= 1.4.5 |      |
| ------------- |:-----------------:|:-----------------:| ---- |
| Vivaldi 1.8   | ✔                | ✔                | [Link](https://vivaldi.com) |

#### Notes
-	Did you noticed that "Other Browsers" are still above IE? Be smart and don't use IE!

Internet Explorer
-----------------
-	IE 8 - IE 11 has been tested on Windows 7 within [VirtualBox](https://www.virtualbox.org/)!

| Version    | jQuery >= 1.8.0   | MooTools >= 1.4.5 |
| ---------- |:-----------------:|:-----------------:|
| MS Edge    | ✘(1)             | ✘(1)             |
| MS IE 11   | ✔                | ✔                |
| MS IE 10   | ✔                | ✔                |
| MS IE 9    | ✔                | ✔                |
| MS IE 8    | ✘(2)             | ✘(3)             |

#### Notes
-	IE 8 - IE 11 doesn't support `tab-size`, use `indent_tab: false` to convert tabs into spaces.
-	(1) MS Edge should work, but my hardware is to slow for testing / debugging! :(
-	(2) The jQuery Version works partly in IE 8!
-	(3) The MooTools Library doesn't work partly in IE 8!