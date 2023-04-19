
# runs test files in one therad
npx jest --maxWorkers=1

# runs specific test files
npx jest blazedemo.js blazedemo2.js

# path to custom Jest config file
npx jest --config=someCustomConfig.js

# prints the test results in JSON
npx jest --json

# writes test results to a file when the --json option is also specified
npx jest --json --outputFile=file.json