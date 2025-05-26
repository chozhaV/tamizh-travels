import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'tamizh-travels';
}
