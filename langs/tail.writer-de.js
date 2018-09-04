;(function(w){

    w.tail.writer.strings = {
        bold: "Fett",
        italic: "Kursiv",
        underline: "Unterstrichen",
        strikethrough: "Durchgestrichen",
        code: "Code",
        link: "Hyperlink einfügen",
        image: "Bild einfügen",
        hr: "Durchgezogene Linie",
        quote: "Zitat",
        indent: "Einzug vergrößern",
        outdent: "Einzug verkleinern",
        header: "Überschrift",
        codeblock: "Quellcode",
        listOrdered: "Geordnete Liste",
        listUnordered: "Ungeordnete Liste",
        listChecked: "Abgehackte Liste",
        listUnchecked: "Unabgehackte Liste",
        headers: "Überschriften",
        table: "Tabelle",
        tableRows: "Zeilen",
        tableCols: "Spalten",
        tableHead: "Tabellenkopf einbetten",
        tableCreate: "Tabelle erstellen",
        linkDialog: "Hyperlink (Popup)",
        imageDialog: "Bild (Popup)",
        tableDialog: "Tabelle (Popup)",
        linkTitle: "Link Titel",
        linkURL: "Link URL",
        linkCreate: "Link hinzufügen",
        imageTitle: "Bild Titel",
        imageURL: "Bild URL",
        imageCreate: "Bild hinzufügen",
        lineCounter: "Zeilen",
        charCounter: "Zeichen",
        wordCounter: "Wörter"
    };
    if(typeof(marked) != "undefined"){
        w.tail.writer.strings.preview = "Vorschau";
        w.tail.writer.strings.previewEmpty = "Keine Vorschau möglich!";
        w.tail.writer.strings.previewExit = "Vorschau Modus beenden";
    }

})(window);
