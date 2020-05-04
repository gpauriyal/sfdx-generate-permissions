# SFDX Generate CRUD and FLS from Source

Create FLS and OBJECT CRUD from the source code in repository

## Getting Started

### Prerequisites

SFDX is installed

Navigate to project`s SFDX source directory

### How to use

- Ensure the current directory is your SFDX root directory

```
node sfdx-generate-permissions -p "<<PATH TO YOUR DEFAULT root folder>> -u <<USERNAME of the SFDX ORG>>
```

```
node sfdx-generate-permissions -p ./force-app/main/default -u test@testg.com
```

### Options

    -u: username of the org to source FLS and CRUD
    -p: path to default folder

## Built With

## Contributing

## Versioning

## Authors

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments