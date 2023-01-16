import React, { useState } from 'react';
import { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './StudyGroupsPage.css';

export function StudyGroupsPage() {
    const [studyGroups, setStudyGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        // fetch list of study groups from the server
        fetch('/api/study-groups')
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => setStudyGroups(data))
            .catch(err => {
                console.log(err);
                // handle error if any
            });
    }, []);

    const handleGroupSelection = (e, { value }) => {
        setSelectedGroup(value);
    };

    return (
        <div>
            <h1>Study Groups</h1>
            <Dropdown
                placeholder="Select a study group"
                options={studyGroups.map(group => ({
                    key: group.id,
                    text: group.inviterEmail,
                    value: group
                }))}
                onChange={handleGroupSelection}
            />
            {selectedGroup && (
                <div>
                    <h2>Resources for {selectedGroup.inviterEmail}'s group</h2>
                    <ul>
                        {selectedGroup.resources.map(resource => (
                            <li key={resource.id}>{resource.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}