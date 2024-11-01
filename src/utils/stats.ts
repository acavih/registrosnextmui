import _ from "lodash";

export function keyStat (elements: any[], keyElement: string, limit = 0) {
    const result: any[] = []
    const keysCollected = {}
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (element === null) continue
        const currentKey = element[keyElement]?.name ?? 'N/A'
        keysCollected[currentKey] = typeof keysCollected[currentKey] === 'number' ? keysCollected[currentKey] + 1 : 1
    }
    for (const key in keysCollected) {
        if (Object.prototype.hasOwnProperty.call(keysCollected, key)) {
            const element = keysCollected[key];
            result.push({name: key, value: element})
        }
    }
    return limit > 0 ? _.orderBy(result, ['value'], ['desc']).slice(0, limit) : result
}

export function multipleKeyStat (elements: any[], keyElement: string, limit = 0) {
    const result: any[] = []
    const keysCollected = {}
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (element === null) continue
        for (let keyArray = 0; keyArray < element[keyElement].length; keyArray++) {
            const keyArrayElement = element[keyElement][keyArray];
            const currentKey = keyArrayElement.name ?? 'N/A'
            keysCollected[currentKey] = typeof keysCollected[currentKey] === 'number' ? keysCollected[currentKey] + 1 : 1
        }
    }
    for (const key in keysCollected) {
        if (Object.prototype.hasOwnProperty.call(keysCollected, key)) {
            const element = keysCollected[key];
            result.push({name: key, value: element})
        }
    }
    return limit > 0 ? _.orderBy(result, ['value'], ['desc']).slice(0, limit) : result
}