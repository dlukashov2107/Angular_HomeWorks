import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM.js';
import * as olProj from 'ol/proj';
import { ILocation } from '../../../models/interfaces';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @Input() location: ILocation;
  @ViewChild('map') mapDom: ElementRef;
  map: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: this.mapDom.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        zoom: 5,
        center: [0, 0],
      }),
    });
  }
}
