// import { expect, afterEach } from 'vitest';
// import { cleanup } from '@testing-library/react';
// import matchers from '@testing-library/jest-dom/matchers';

// // extends Vitest's expect method with methods from react-testing-library
// expect.extend(matchers);

// // runs a cleanup after each test case (e.g. clearing jsdom)
// afterEach(() => {
//   cleanup();
// });




// import { vi } from 'vitest';
// import matchers, {
//   TestingLibraryMatchers,
// } from '@testing-library/jest-dom/matchers';

// declare global {
//   namespace Vi {
//     interface JestAssertion<T = any>
//       extends jest.Matchers<void, T>,
//         TestingLibraryMatchers<T, void> {}
//   }
// }

// expect.extend(matchers);



// import '@testing-library/jest-dom/vitest'
import '@testing-library/jest-dom'
import 'jest-styled-components'