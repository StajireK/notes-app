import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get notes', (done) => {
    service.getNotes().subscribe({
      next: (notes) => {
        expect(notes.length).toBeGreaterThan(0);
        done();
      },
      error: (err) => {
        console.error('Error fetching notes', err);
        done.fail(err);
      },
    });
  });
});
