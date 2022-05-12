<template>
  <div class="color-converter">
    <h1>Hex color to CSS Filter converter</h1>

    <div class="color-converter__controls">
      <button @click="currentTab = tabs.preview">Preview</button>
      <button @click="currentTab = tabs.variables">Variables</button>
      <button @click="currentTab = tabs.mapVariables">Map</button>
    </div>
    <template v-if="currentTab === tabs.preview">
      <h2>Vars preview</h2>
      <div
        v-for="({ name, color, result }, ckey) in colorsConverted"
        :key="ckey"
        class="color-table"
      >
        <div class="color-table__color-name">{{ name }}:</div>
        <div class="color-table__color">{{ color }}</div>
        <div class="color-table__color-example" :style="{ 'background-color': color }"></div>
        <div class="color-table__filter">{{ result }}</div>
        <div
          class="color-table__color-example"
          :style="getCSSStyle(result)"></div>
      </div>
    </template>
    <template v-if="currentTab === tabs.variables">
      <h2>Converted variables</h2>
      <div v-for="(obj, key) in printSCSSObjectVars()" :key="key" class="result">
        {{ `$css-filter-${obj.name}: ${obj.result}` }}
      </div>
    </template>
    <template v-if="currentTab === tabs.mapVariables">
      <h2>Map</h2>
      <div v-for="(obj, key) in printSCSSObjectVars()" :key="key" class="result">
        {{ `"css-filter-${obj.name}": $css-filter-${obj.name},` }}
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import {
  Options,
  Vue,
} from 'vue-property-decorator';
import {
  hexToCSSFilter,
  HexToCssResult,
} from 'hex-to-css-filter';

enum ETabs {
  'preview' = 'preview',
  'variables' = 'variables',
  'mapVariables' = 'map-variables',
}

@Options({})
export default class AboutView extends Vue {
  tabs = ETabs;
  currentTab: ETabs = ETabs.preview;
  colors: Record<string, string> = {
    'ol-primary': '#00C7FE',
    'ol-primary-variant': '#00B6F2',
    'ol-secondary': '#FF0066',
    'ol-secondary-variant': '#E0005A',
    'tl-primary': '#7338C7',
    'tl-primary-variant': '#5D2EA1',
    'tl-secondary': '#F84747',
    'tl-secondary-variant': '#DA3E3E',
    'pf-primary': '#1EA5FC',
    'pf-primary-variant': '#038FE9',
    'pf-secondary': '#F85EBA',
    'pf-secondary-variant': '#D544A9',
    'cmc-primary': '#F43C5A',
    'cmc-primary-variant': '#CC344D',
    'cmc-secondary': '#0DC268',
    'cmc-secondary-variant': '#0CAD5D',
    'lw-primary': '#0DFCD0',
    'lw-primary-variant': '#03D4B8',
    'lw-secondary': '#7600EC',
    'lw-secondary-variant': '#6100C2',
    'un-primary': '#68E0CF',
    'un-primary-variant': '#25D0B8',
  };

  get colorsConverted(): any {
    const res: any[] = [];
    Object.entries(this.colors)
      .forEach(([name, color]: [string, string]) => {
        res.push({
          name,
          color,
          result: this.getCSSFilter(color).filter,
        });
      });
    return res;
  }

  mounted() {
    this.printSCSSObjectVars();
  }

  // eslint-disable-next-line class-methods-use-this
  getCSSFilter(color: string): HexToCssResult {
    return hexToCSSFilter(color);
  }

  // eslint-disable-next-line class-methods-use-this
  getCSSStyle(filter: any) {
    return {
      'background-color': 'black',
      filter: `${filter.slice(0, -1)}`,
    };
  }

  printSCSSObjectVars(): any[] {
    return this.colorsConverted.map((entry: any) => {
      const {
        name,
        result,
      } = entry;
      return {
        name: `${name}`,
        result,
      };
    });
  }
}
</script>

<style lang="scss">
.color-converter {
  display: flex;
  flex-direction: column;

  .color-converter__controls {
    display: flex;
  }

  .color-table {
    display: flex;
    align-items: center;
    padding: 5px;
  }

  .color-table__color-name {
    font-weight: bold;
    margin-right: 5px;
  }

  .color-table__color {
    margin-right: 5px;
  }

  .color-table__color-example {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .result {
    display: flex;
  }
}
</style>
