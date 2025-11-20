const getElement = (selection) => {
    const element = document.querySelector(selection);

    if(element)return element;
    throw new Error(`no element, ${selection}, selected`)
}

export default getElement;