import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-900 text-white py-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <div class="text-2xl">🚗</div>
              <h3 class="text-lg font-bold text-primary-400"
                  [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                {{ languageService.t('appName') }}
              </h3>
            </div>
            <p class="text-gray-300 text-sm"
               [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 
                'தமிழ்நாடு முழுவதும் நம்பகமான மற்றும் வசதியான பயணம்' : 
                'Reliable and convenient travel across Tamil Nadu' }}
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-white">Quick Links</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-primary-400 transition-colors">{{ languageService.t('aboutUs') }}</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">{{ languageService.t('contact') }}</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">{{ languageService.t('support') }}</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">{{ languageService.t('termsPrivacy') }}</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-white">Services</h4>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center space-x-2">
                <span>🏍️</span>
                <span [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? 'பைக்' : 'Bike' }}
                </span>
              </li>
              <li class="flex items-center space-x-2">
                <span>🛺</span>
                <span [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? 'ஆட்டோ' : 'Auto' }}
                </span>
              </li>
              <li class="flex items-center space-x-2">
                <span>🚗</span>
                <span [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? 'டாக்சி' : 'Taxi' }}
                </span>
              </li>
              <li class="flex items-center space-x-2">
                <span>🚙</span>
                <span [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? 'அவுட்ஸ்டேஷன்' : 'Outstation' }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-white">Contact</h4>
            <div class="space-y-2 text-gray-300">
              <div class="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 9876543210</span>
              </div>
              <div class="flex items-center space-x-2">
                <span>📧</span>
                <span>support&#64;tamizhtravels.com</span>
              </div>
              <div class="flex items-center space-x-2">
                <span>📍</span>
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TamizhTravels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  languageService = inject(LanguageService);
}