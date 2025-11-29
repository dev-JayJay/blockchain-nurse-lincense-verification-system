// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NurseLicenseRegistry {
    struct License {
        string nurseId;
        string firstName;
        string lastName;
        string licenseNumber;
        string status;
        uint256 timestamp;
    }

    mapping(string => License) private licenses;

    event LicenseAdded(string nurseId, string licenseNumber, string status);
    event LicenseUpdated(string nurseId, string newStatus);

    function addLicense(
        string memory nurseId,
        string memory firstName,
        string memory lastName,
        string memory licenseNumber,
        string memory status
    ) public {
        licenses[nurseId] = License(
            nurseId,
            firstName,
            lastName,
            licenseNumber,
            status,
            block.timestamp
        );

        emit LicenseAdded(nurseId, licenseNumber, status);
    }

    function updateLicenseStatus(
        string memory nurseId,
        string memory newStatus
    ) public {
        require(bytes(licenses[nurseId].nurseId).length != 0, "License not found");
        licenses[nurseId].status = newStatus;

        emit LicenseUpdated(nurseId, newStatus);
    }

    function getLicense(
        string memory nurseId
    ) public view returns (License memory) {
        return licenses[nurseId];
    }
}