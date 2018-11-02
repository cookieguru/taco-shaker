import { Marked } from 'marked-ts';

const URL = 'http://www.randomtaco.me/random/?full-taco=true';
const TIMEOUT = 2000;

export function getRandomTaco(): Promise<TacoResponse> {
    return new Promise((resolve, reject) => {
        fetchWithBackoff(URL).then((response: any) => {
            if (!response.ok) {
                throw new Error('Error fetching weather data');
            }
            return response.json();
        }).then((json) => {
            resolve(new TacoResponse(json));
        }).catch(reject);
    });
}

function fetchWithBackoff(url: string, waitTime?: number): Promise<Response> {
    return new Promise((resolve, reject) => {
        if (waitTime > TIMEOUT) {
            reject('Timeout fetching data');
        }
        setTimeout(() => {
            fetch(url).then((response) => {
                if (response.ok) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        }, waitTime);
    });
}

export class TacoResponse {
    public title: string;
    public recipe: string;
    public mixin: string;
    public baseLayer: string;
    public condiment: string;

    constructor(jsonResponse: any) {
        this.title = jsonResponse.name;
        this.recipe = jsonResponse.recipe;
        this.mixin = jsonResponse.mixin ? jsonResponse.mixin.recipe : '_(none)_';
        this.baseLayer = jsonResponse.base_layer ? jsonResponse.base_layer.recipe : '_(none)_';
        this.condiment = jsonResponse.condiment ? jsonResponse.condiment.recipe : '_(none)_';

        this.recipe = Marked.parse(this.recipe);
        this.mixin = Marked.parse(this.mixin);
        this.baseLayer = Marked.parse(this.baseLayer);
        this.condiment = Marked.parse(this.condiment);
    }
}
