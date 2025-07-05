import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideType } from '../../types/ride.types';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-ride-type-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4"
          [class.font-tamil]="languageService.currentLanguage() === 'ta'">
        {{ languageService.t('selectRideType') }}
      </h3>
      
      <div class="space-y-3">
        <div 
          *ngFor="let rideType of rideTypes"
          (click)="selectRideType(rideType)"
          class="ride-type-card"
          [class.selected]="selectedRideType?.id === rideType.id">
          
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="text-3xl">{{ rideType.icon }}</div>
              <div>
                <div class="font-semibold text-gray-900"
                     [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? rideType.nameTA : rideType.name }}
                </div>
                <div class="text-sm text-gray-500"
                     [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? rideType.descriptionTA : rideType.description }}
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  {{ rideType.capacity }} {{ rideType.capacity === 1 ? 'person' : 'people' }} • {{ rideType.estimatedTime }}
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <div class="font-semibold text-gray-900">
                ₹{{ rideType.baseFare }}
              </div>
              <div class="text-sm text-gray-500">
                +₹{{ rideType.perKmRate }}/km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RideTypeSelectorComponent {
  @Input() rideTypes: RideType[] = [];
  @Input() selectedRideType: RideType | null = null;
  @Output() rideTypeChange = new EventEmitter<RideType>();

  languageService = inject(LanguageService);

  selectRideType(rideType: RideType): void {
    this.selectedRideType = rideType;
    this.rideTypeChange.emit(rideType);
  }
}