fs = require('fs');
const path = require('path');
const { XMLParser } = require("fast-xml-parser")
const { JSDOM } = require('jsdom')

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '', // you have assign this so use this to access the attribute
}

const parser = new XMLParser(options);

function readXML(file = './persona.xml') {
  const content = fs.readFileSync(file, 'utf8')
  const xml = parser.parse(content, true)
  return xml

}

function readDOM() {
  const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
  const css = fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf-8');

  const dom = new JSDOM(html, {
    resources: 'usable',
    runScripts: 'dangerously',
  })

  const styleElement = dom.window.document.createElement('style');
  styleElement.textContent = css;
  dom.window.document.head.appendChild(styleElement);

  return dom.window
}

module.exports = {
  readXML,
  readDOM
}