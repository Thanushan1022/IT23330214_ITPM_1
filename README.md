# ITPM_Assignment01

## Project Overview

This is a Playwright-based test automation project for testing a **Thanglish to Tamil Converter**. The project validates the functionality of the online Tamil conversion tool at [tamil.changathi.com](https://tamil.changathi.com/).

## Features

- **24 Positive Functional Tests (Pos_Fun)**: Tests covering various Tamil language scenarios including greetings, questions, commands, negative forms, tenses, mixed English, numbers/time, places, and formatting.
- **10 Negative Functional Tests (Neg_Fun)**: Tests that validate expected failures, demonstrating system robustness and known limitations.
- **Page Title Validation**: Ensures the website loads correctly with the expected title.

## Test Coverage

### Positive Tests (Pos_Fun)
- Greeting conversion: `vanakkam` → `வணக்கம்`
- Question handling: `epdi irukeenga?` → `எப்படி இருக்கீங்க`
- Simple sentences and commands
- Negative forms and past/future tenses
- Mixed English terms and complex sentences

### Negative Tests (Neg_Fun)
- Malformed inputs and typos
- Missing vowels and special characters
- Place name preservation
- Mixed slang handling
- Punctuation robustness
- Multi-line and very long text input
- Technical abbreviations

## Project Structure

```text
playwright-project/                  # (or your repo name)
├── tests/
│   └── Thanglish-To-Tamil.spec.js   # Main test suite (Tanglish → Tamil automation)
├── node_modules/                    # (auto-generated - not committed)
├── playwright-report/               # HTML reports (after run)
├── test-results/                    # Trace files, screenshots, videos (after run)
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js             # Playwright configuration
└── README.md

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Thanushan1022/IT23330214_ITPM_1.git
cd ITPM_Assignment01
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install


### Run in headed mode (see browser):
```bash
npx playwright test --headed
```

### Generate test report:
```bash
npx playwright show-report
```

## Configuration

The `playwright.config.js` file contains configuration for:
- Browser type (Chromium, Firefox, WebKit)
- Timeout settings
- Base URL (if applicable)
- Report generation

## Technologies Used

- **Playwright**: Browser automation framework
- **Node.js**: JavaScript runtime
- **Chromium**: Browser engine for testing

## Test Results

After running the tests, reports are generated in:
- `playwright-report/` - HTML report
- `test-results/` - Detailed test results

## Notes

- All tests interact with a live website at `https://tamil.changathi.com/`
- Tests use the textbox input element to enter Thanglish text
- Expected Tamil outputs are validated using regex patterns
- Negative tests expect the system to NOT produce perfect conversions in edge cases

## Contributing

To add new tests:
1. Create test cases in `ThanglishToTamil.spec.js`
2. Follow the existing naming convention: `Pos_Fun_XX` or `Neg_Fun_XX`
3. Run tests to validate
4. Update this README if adding new test categories

