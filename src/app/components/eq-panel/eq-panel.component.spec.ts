import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EqPanelComponent } from './eq-panel.component';
import { AppTheme, EqBand, Enhancements } from '../../services/user-context.service';

describe('EqPanelComponent', () => {
  let component: EqPanelComponent;
  let fixture: ComponentFixture<EqPanelComponent>;

  const mockTheme: AppTheme = {
    name: 'test-theme',
    primary: 'cyan',
    accent: 'yellow',
    neutral: 'gray',
    purple: 'purple',
    red: 'red',
    blue: 'blue'
  };

  const mockEqSettings: EqBand[] = [
    { label: '60Hz', value: 50 },
    { label: '170Hz', value: 50 },
  ];

  const mockEnhancements: Enhancements = {
    bassBoost: false,
    surroundSound: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EqPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EqPanelComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('theme', mockTheme);
    fixture.componentRef.setInput('eqSettings', mockEqSettings);
    fixture.componentRef.setInput('enhancements', mockEnhancements);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit eqChange when a slider changes', () => {
    spyOn(component.eqChange, 'emit');
    const input = fixture.nativeElement.querySelector('input[type=range]');
    input.value = '75';
    input.dispatchEvent(new Event('input'));

    expect(component.eqChange.emit).toHaveBeenCalledWith([
      { label: '60Hz', value: 75 },
      { label: '170Hz', value: 50 },
    ]);
  });

  it('should emit enhancementsChange when a checkbox toggles', () => {
    spyOn(component.enhancementsChange, 'emit');
    const checkbox = fixture.nativeElement.querySelector('input[type=checkbox]');
    checkbox.click();

    expect(component.enhancementsChange.emit).toHaveBeenCalledWith({
      bassBoost: true,
      surroundSound: false
    });
  });

  it('should emit close when close button is clicked', () => {
    spyOn(component.close, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('button');
    closeBtn.click();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
