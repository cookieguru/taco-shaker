import { ActivityIndicator, NavigationView, Page, ScrollView, TextView, contentView } from 'tabris';
import { TacoResponse, getRandomTaco } from './connectors/taco';

let navigationView = new NavigationView({
    left: 0, top: 0, right: 0, bottom: 0
}).appendTo(contentView);

let page = new Page({
    title: 'Taco Shaker'
}).appendTo(navigationView);

let scrollView = new ScrollView({
    left: 0, right: 0, top: 0, bottom: 0
}).appendTo(page);

new TextView({
    top: 0, left: 16, right: 16,
    id: 'title',
    font: 'bold 28px'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 16], left: 16, right: 16,
    text: 'Base Layer',
    font: 'italic 26px thin sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'base-layer'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 16, right: 16,
    text: 'Mixin',
    font: 'italic 26px thin sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'mixin'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 16, right: 16,
    text: 'Condiment',
    font: 'italic 26px thin sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'condiment'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 16, right: 16,
    text: 'Recipe',
    font: 'italic 26px thin sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'recipe'
}).appendTo(scrollView);

function loadTaco() {
    let activityIndicator = new ActivityIndicator({centerX: 0, centerY: 0}).appendTo(contentView);
    getRandomTaco().then((taco: TacoResponse) => {
        scrollView.find(TextView).only('#title').text = taco.title;
        scrollView.find(TextView).only('#recipe').text = taco.recipe;
        scrollView.find(TextView).only('#mixin').text = taco.mixin;
        scrollView.find(TextView).only('#base-layer').text = taco.baseLayer;
        scrollView.find(TextView).only('#condiment').text = taco.condiment;
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        activityIndicator.dispose();
    });
}

shake.startWatch(loadTaco, 40, console.error);

loadTaco();
