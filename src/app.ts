import {ActivityIndicator, NavigationView, Page, ScrollView, TextView, ui} from 'tabris';
import {getRandomTaco} from './connectors/taco';

let navigationView = new NavigationView({
    left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

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
    font: 'thin italic 26px sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'base-layer'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 16, right: 16,
    text: 'Mixin',
    font: 'thin italic 26px sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'mixin'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 16, right: 16,
    text: 'Condiment',
    font: 'thin italic 26px sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'condiment'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 16, right: 16,
    text: 'Recipe',
    font: 'thin italic 26px sans-serif'
}).appendTo(scrollView);

new TextView({
    top: ['prev()', 0], left: 32, right: 16,
    markupEnabled: true,
    id: 'recipe'
}).appendTo(scrollView);

function loadTaco() {
    let activityIndicator = new ActivityIndicator({centerX: 0, centerY: 0}).appendTo(ui.contentView);
    getRandomTaco().then((data) => {
        scrollView.apply({
            '#title': { text: data.title },
            '#recipe': { text: data.recipe },
            '#mixin': { text: data.mixin },
            '#base-layer': { text: data.baseLayer },
            '#condiment': { text: data.condiment }
        });
    }).catch((error) => {
        // noinspection TsLint
        console.error(error);
    }).then(() => {
        activityIndicator.dispose();
    });
}

shake.startWatch(loadTaco, 40, console.error);

loadTaco();
