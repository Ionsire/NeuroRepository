import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrarCasoGuardsGuard } from './registrar-caso-guards.guard';

describe('RegistrarCasoGuardsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrarCasoGuardsGuard]
    });
  });

  it('should ...', inject([RegistrarCasoGuardsGuard], (guard: RegistrarCasoGuardsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
