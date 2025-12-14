import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoEditorComponent } from './video-editor.component';
import { AiService } from '../../services/ai.service';
import { AppTheme } from '../../services/user-context.service';

describe('VideoEditorComponent', () => {
  let component: VideoEditorComponent;
  let fixture: ComponentFixture<VideoEditorComponent>;
  let mockAiService: jasmine.SpyObj<AiService>;

  const mockTheme: AppTheme = {
    name: 'dark',
    primary: '#000',
    accent: '#f00',
    neutral: '#333',
    purple: '#555',
    red: '#900',
    blue: '#009'
  };

  beforeEach(async () => {
    mockAiService = jasmine.createSpyObj('AiService', ['isAiAvailable', 'getApiKey'], {
      genAI: {
        models: {
            generateVideos: jasmine.createSpy('generateVideos')
        },
        operations: {
            getVideosOperation: jasmine.createSpy('getVideosOperation')
        }
      }
    });

    // Default mock behavior
    mockAiService.isAiAvailable.and.returnValue(true);
    mockAiService.getApiKey.and.returnValue('test-key');

    await TestBed.configureTestingModule({
      imports: [VideoEditorComponent],
      providers: [
        { provide: AiService, useValue: mockAiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoEditorComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('theme', mockTheme);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have AI service available', () => {
    expect(component.isAiAvailable()).toBeTrue();
  });
});
