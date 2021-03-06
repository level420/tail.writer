/*
 |  tail.writer - A flexible and comfortable markup editor, written in vanilla JavaScript!
 |  @file       ./langs/tail.writer-all.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.1 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.writer
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2015 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
;(function(factory){
   if(typeof(define) == "function" && define.amd){
       define(function(){
           return function(writer){ factory(writer); };
       });
   } else {
       if(typeof(window.tail) != "undefined" && window.tail.writer){
           factory(window.tail.writer);
       }
   }
}(function(writer){
    "use strict";
    var w = window, d = window.document, tail = writer.__helper;

    /*
     |  Translator:     SamBrishes - (https://www.pytes.net)
     |  GitHub:         <internal>
     */
    w.tail.writer.strings.register("de", {
        chars: "Zeichen",
        lines: "Zeilen",
        words: "Wörter",

        // Markups
        bbcode: "BBCode",
        markdown: "Markdown",
        textile: "Textile",

        // Actions
        about: "Über",
        aboutDevelop: "Entwickelt von $1",
        aboutDesc1: "geschrieben in purem Vanilla JavaScript",
        aboutDesc2: "veröffentlicht unter der MIT Lizenz",
        aboutDesign: "Designed mit $1",
        aboutLink1: "GitHub Repository",
        aboutLink2: "Dokumentation",
        aboutLink3: "Demonstration",
        aboutLink4: "Fehler melden",
        fullscreen: "Vollbild wechseln",
        indent: "Einzug vergrößern",
        markup: "Change Markup",
        modeWrite: "Schreiben",
        modePreview: "Vorschau",
        outdent: "Einzug verkleinern",
        preview: "Vorschau wechseln",
        previewEmpty: "Keine Vorschau möglich!",

        // Debug
        errorAction: "Die gewünschte Aktion ist unbekannt!",
        errorMarkup: "Die gewünschte Markup ist unbekannt!",

        // Markups
        acronym: "Akronym",
        big: "Großschrift",
        bold: "Fett",
        center: "Zentriert",
        cite: "Zitieren",
        code: "Quellcode (Inzeilig)",
        codeblock: "Quellcode (Block)",
        color: "Textfarbe",
        definition: "Definitionsliste",
        emphasize: "Emphasis",
        email: "eMail",
        emailAddress: "eMail Adresse",
        emailButton: "eMail Link einfügen",
        emailTitle: "eMail Titel",
        font: "Schriftart",
        header: "Überschrift",
        headers: "Überschriften",
        hr: "Vertikaler Trennstrich",
        image: "Bild",
        imageButton: "Bild einfügen",
        imageTitle: "Bild Titel",
        imageURL: "Bild URL",
        italic: "Kursiv",
        justify: "Blocksatz",
        left: "Linksbündig",
        link: "Hyperlink",
        linkNewTab: "In einem neuen Tag öffnen",
        linkButton: "Link einfügen",
        linkTitle: "Link Titel",
        linkURL: "Link URL",
        listOrdered: "Geordnete Liste",
        listUnordered: "Ungeordnete Liste",
        listChecked: "Abgehakte Liste",
        listUnchecked: "Unabgehakte Liste",
        pre: "Vorformatierter Text",
        quote: "Zitat",
        right: "Rechtsbündig",
        size: "Textgröße",
        small: "Kleinschrift",
        span: "Span",
        strikethrough: "Durchgestrichen",
        strong: "Fettdruck",
        sub: "Tiefgestellt",
        sup: "Hochgestellt",
        table: "Tabelle",
        tableButton: "Tabelle einfügen",
        tableHeader: "Mit Tabellenkopf",
        tableFooter: "Mit Tabellenfuß",
        tableCols: "Spalten",
        tableRows: "Zeilen",
        underline: "Unterstrichen"
    });

    /*
     |  Translator:     Wojciech Jodla - (https://github.com/Joduai)
     |  GitHub:         <internal>
     */
    w.tail.writer.strings.register("pl", {
        chars: "Znaki",
        lines: "Linie",
        words: "Słowa",

        // Markups
        bbcode: "BBCode",
        markdown: "Markdown",
        textile: "Textile",

        // Actions
        about: "Informacje",
        aboutDevelop: "Stworzone przez $1 (tłum. Wojciech Jodła)",
        aboutDesc1: "zaprogramowane w vanilla JavaScript",
        aboutDesc2: "opublikowane na licencji MIT",
        aboutDesign: "Zaprojektowane przy użyciu $1",
        aboutLink1: "Repozytorium GitHub",
        aboutLink2: "Dokumentacja",
        aboutLink3: "Demonstracja",
        aboutLink4: "Zgłoś błąd",
        fullscreen: "tryb pełnoekranowy",
        indent: "wcięcie",
        markup: "zmień język znaczników",
        modeWrite: "Edycja",
        modePreview: "Podgląd",
        outdent: "usuń wcięcie",
        preview: "okno podglądu",
        previewEmpty: "Nie została jeszcze wprowadzona żadna treść!",

        // Debug
        errorAction: "Użyta akcja nie jest zdefiniowana!",
        errorMarkup: "Użyty znacznik nie istnieje!",

        // Markups
        acronym: "akronim",
        big: "duży tekst",
        bold: "pogrubienie",
        center: "wycentruj paragraf",
        cite: "cytat",
        code: "kod (liniowy)",
        codeblock: "kod (blokowy)",
        color: "Kolor tekstu",
        definition: "lista definicji",
        emphasize: "emfaza",
        email: "e-mail",
        emailAddress: "adres e-mail",
        emailButton: "wstaw link e-mail",
        emailTitle: "tytuł e-maila",
        font: "font",
        header: "fagłówek",
        headers: "nagłówki",
        hr: "linia pozioma",
        image: "obraz",
        imageButton: "wstaw obraz",
        imageTitle: "tytuł obrazu",
        imageURL: "adres obrazu",
        italic: "kursywa",
        justify: "wyjustuj paragraf",
        left: "wyrównaj do lewej",
        link: "hiperlink",
        linkNewTab: "otwórz link w nowej zakładce",
        linkButton: "wstaw odnośnik",
        linkTitle: "tytuł odnośnika",
        linkURL: "adres odnośnika",
        listOrdered: "lista numerowana",
        listUnordered: "lista wypunktowana",
        listChecked: "lista zaznaczona",
        listUnchecked: "lista odznaczona",
        pre: "tekst preformatowany",
        quote: "blok cytatu",
        right: "wyrównaj do prawej",
        size: "rozmiar tekstu",
        small: "mały tekst",
        span: "element span",
        strikethrough: "przekreślenie",
        strong: "wytłuszczenie tekstu",
        sub: "indeks dolny",
        sup: "indeks górny",
        table: "tabela",
        tableButton: "wstaw tabelę",
        tableHeader: "dodaj nagłówek tabeli",
        tableFooter: "dodaj stopkę tabeli",
        tableCols: "Kolumny",
        tableRows: "Rzędy",
        underline: "podkreślenie"
    });
    return writer;
}));
