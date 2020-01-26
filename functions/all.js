let data = {
    "SECUNDERABAD": {
        "MUSHEERABAD": [
            "ADIKMET",
            "MUSHEERABAD",
            "RAMNAGAR",
            "BHOLAKPUR",
            "GANDHINAGAR",
            "KAVADIGUDA"
        ],
        "AMBERPET": [
            "HIMAYATHNAGAR",
            "KACHIGUDA(BARKATHPURA)",
            "NALLAKUNTA",
            "GOLNAKA",
            "AMBERPET",
            "BAGHAMBERPET"
        ],
        "MALKAJIGIRI": [
            "NEREDMET",
            "VINAYAKANGR",
            "MOULA-ALI",
            "EASTANANDBAGH",
            "MALKAJIGIRI",
            "GOWTHAMNGR"
        ],
        "SECUNDERABAD": [
            "ADDAGUTTA",
            "TARANAKA",
            "METTIGUDA",
            "SEETHAPHALMANDI",
            "BOUDHANAGAR"
        ],
    }
}
let result = {};
Object.keys(data).map(element => {
    result["label"] = element;
    result["key"] = element;
    let circle = [];
    Object.keys(data[element]).map(inner => {
        let ward = [];
        data[element][inner].map(extreme => {
            let a = {
                label: extreme,
                key: extreme
            }
            ward.push(a);
        });
        console.log(ward);
        let temp = {
            label: inner,
            key: inner,
            ward: ward
        }
        circle.push(temp);
    })
    result["circle"] = circle;
})
console.log(result);

let prepare = {
    label: 'SECUNDERABAD',
    key: 'SECUNDERABAD',
    circle:
        [{
            label: 'MUSHEERABAD', key: 'MUSHEERABAD', ward:
                [{ label: 'ADIKMET', key: 'ADIKMET' },
                { label: 'MUSHEERABAD', key: 'MUSHEERABAD' },
                { label: 'RAMNAGAR', key: 'RAMNAGAR' },
                { label: 'BHOLAKPUR', key: 'BHOLAKPUR' },
                { label: 'GANDHINAGAR', key: 'GANDHINAGAR' },
                { label: 'KAVADIGUDA', key: 'KAVADIGUDA' }]
        },
        {
            label: 'AMBERPET', key: 'AMBERPET', ward:
                [{ label: 'HIMAYATHNAGAR', key: 'HIMAYATHNAGAR' },
                {
                    label: 'KACHIGUDA(BARKATHPURA)',
                    key: 'KACHIGUDA(BARKATHPURA)'
                },
                { label: 'NALLAKUNTA', key: 'NALLAKUNTA' },
                { label: 'GOLNAKA', key: 'GOLNAKA' },
                { label: 'AMBERPET', key: 'AMBERPET' },
                { label: 'BAGHAMBERPET', key: 'BAGHAMBERPET' }]
        },
        {
            label: 'MALKAJIGIRI', key: 'MALKAJIGIRI', ward:
                [{ label: 'NEREDMET', key: 'NEREDMET' },
                { label: 'VINAYAKANGR', key: 'VINAYAKANGR' },
                { label: 'MOULA-ALI', key: 'MOULA-ALI' },
                { label: 'EASTANANDBAGH', key: 'EASTANANDBAGH' },
                { label: 'MALKAJIGIRI', key: 'MALKAJIGIRI' },
                { label: 'GOWTHAMNGR', key: 'GOWTHAMNGR' }]
        },
        {
            label: 'SECUNDERABAD', key: 'SECUNDERABAD', ward: [{ label: 'ADDAGUTTA', key: 'ADDAGUTTA' },
            { label: 'TARANAKA', key: 'TARANAKA' },
            { label: 'METTIGUDA', key: 'METTIGUDA' },
            { label: 'SEETHAPHALMANDI', key: 'SEETHAPHALMANDI' },
            { label: 'BOUDHANAGAR', key: 'BOUDHANAGAR' }]
        }]
} 