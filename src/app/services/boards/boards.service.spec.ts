import { TestBed } from '@angular/core/testing'
import { BoardsService } from './boards.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BoardsService', () => {
  let service: BoardsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(BoardsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
