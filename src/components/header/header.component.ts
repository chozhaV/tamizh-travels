import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div class="text-2xl">🚗</div>
            <h1 class="text-xl font-bold text-primary-700" 
                [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.t('appName') }}
            </h1>
          </div>

          <!-- Language Toggle -->
          <button 
            (click)="languageService.toggleLanguage()"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <span class="text-sm font-medium">{{ languageService.t('language') }}</span>
            <div class="w-4 h-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  languageService = inject(LanguageService);
}