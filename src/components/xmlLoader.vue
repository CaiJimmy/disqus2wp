<template>
    <md-card>
        <md-card-content>
            <md-field>
                <label>Disqus XML</label>
                <md-file v-model="disqusXMLFile"
                    placeholder="Upload Disqus XML"
                    @change="loadXML"
                    accept="text/xml" />
            </md-field>
        </md-card-content>
    </md-card>
</template>
<script>
import xmlConvert from 'xml-js';

export default {
    name: 'XML-Loader',
    props: ['callback'],
    data: () => ({
        disqusXML: null,
        disqusXMLFile: null
    }),
    methods: {
        loadXML (event) {
            let file = event.target.files[0];

            if (!file) {
                return;
            };

            let reader = new FileReader();

            reader.onload = async () => {
                this.disqusXML = reader.result;

                let disqusJSON = this.xmlToJson(this.disqusXML).then(json => {
                    this.callback(json.disqus);
                });
            };

            reader.readAsText(file);
        },
        xmlToJson (xml) {
            return new Promise(resolve => {
                resolve(JSON.parse(xmlConvert.xml2json(
                    xml,
                    {
                        compact: true,
                        spaces: 4
                    }
                )));
            })
        }
    }
}
</script>

