const { readXML, readDOM } = require('./grades')
// require('@testing-library/jest-dom')
const { getByText } = require('@testing-library/dom')
// const {h1} = require('./main')

describe('XML', () => {
    const xml = readXML()
    const { persona } = xml

    test('nombre', () => {
        expect(persona.nombre.toLowerCase()).toBe('covadonga');
    })
    test('direccion', () => {
        expect(persona.direccion.calle.toLowerCase()).toBe('uria');
        expect(persona.direccion.ciudad.toLowerCase()).toBe('oviedo');
        expect(persona.direccion.numero).toBe(23);
    })
    test('hobbies', () => {
        expect(persona.hobbies.hobbie.length).toBe(3)
    })
})



describe('HTML', () => {
    const document = readDOM().document

    test('h1', () => {
        const h1 = document.querySelector('h1')
        expect(h1.textContent.trimEnd()).toBe('UT1: LLMM (Simulacro)')
    })
    test('p', () => {
        const p = document.querySelector('p')
        expect(p.textContent.trimEnd()).toBe('Esto es un simulacro de un examen')
    })

    test('ul', () => {
        const li = document.querySelectorAll('ul>li')
        expect(li.length).toBe(3)
    })

    test('table', () => {
        const tr = document.querySelectorAll('tr')
        const td = document.querySelectorAll('td')
        const rowspan = td[2].attributes.getNamedItem('rowspan')?.textContent ?? null
        const colspan = td[5].attributes.getNamedItem('colspan')?.textContent ?? null
        expect(tr.length).toBe(4)
        expect(td.length).toBe(6)
        expect(rowspan).toBe('2')
        expect(colspan).toBe('2')
    })
})

describe('CSS', () => {
    const window = readDOM()
    const document = window.document


    test('h1 style', () => {
        const h1 = document.querySelector('h1')
        const computedStyle = window.getComputedStyle(h1)
        // console.log(h1)
        expect(computedStyle.color).toBe('rgb(255, 0, 0)')
        expect(computedStyle.fontSize).toBe('64px')
        expect(computedStyle.fontFamily).toContain('Arial')
    })
    test('table style', () => {
        const td = document.querySelectorAll('td')
        const td4 = td[3]
        const td7 = td[5]
        const computedTd4 = window.getComputedStyle(td4)
        const computedTd7 = window.getComputedStyle(td7)

        expect(computedTd4).toEqual(computedTd7)
        expect(computedTd4.backgroundColor).toBe('rgb(208, 191, 255)')
        expect(td4.className).toBe(td7.className)
        expect(td4.id).not.toBe(td7.id)
    })
})