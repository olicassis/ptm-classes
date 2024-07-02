import { format } from 'date-fns'

import { formatDate } from '../src/date'

jest.mock('date-fns', () => ({
  format: jest.fn(),
}))
const mockedFormat = format as jest.MockedFunction<typeof format>

describe('Date package Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should format the data in the expected format', () => {
    const givenDate = '02/07/2024'
    const expectedFormat = '2024-07-02'

    mockedFormat.mockReturnValueOnce(expectedFormat)

    const formattedDate = formatDate(givenDate)
    expect(mockedFormat).toHaveBeenCalledTimes(1)
    expect(mockedFormat).toHaveBeenCalledWith(givenDate, 'yyyy-MM-dd')
    expect(formattedDate).toEqual(expectedFormat)
  })
})
