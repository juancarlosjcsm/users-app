import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    @if (isLoading()) {
      <div class="d-flex justify-content-center ">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  isLoading = inject(SpinnerService).isLoading;
}
