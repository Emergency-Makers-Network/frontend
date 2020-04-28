import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { fetchAllUsers } from './users.asyncActions';
import { selectAllUsers } from './users.selectors';
import BusyIndicator from '../../widgets/busyIndicator';
import { selectAllSettings, setNoBusySpinner } from '../settings';

export default function Users() {
    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();

    const settings = useSelector(selectAllSettings);

    useEffect(() => {
        dispatch(
            fetchAllUsers({
                useCaching: settings.useCaching,
                noBusySpinner: settings.noBusySpinner,
            }),
        );
    }, [dispatch, settings.useCaching, settings.noBusySpinner]);

    return (
        <div>
            <Row>
                <Col>
                    <h2>Users</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <BusyIndicator>
                        <ul>{users && users.map((user) => <li key={user.id}>{user.login}</li>)}</ul>
                    </BusyIndicator>
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Options</Card.Title>
                            <Container>
                                <Row>
                                    <Button onClick={() => dispatch(setNoBusySpinner(false))} variant="info">
                                        Reload with Busy Spinnner
                                    </Button>
                                </Row>
                                <Row>
                                    <strong>{`noBusySpinner: ${settings.noBusySpinner}`}</strong>
                                </Row>
                                <Row>
                                    <strong>{`useCaching: ${settings.useCaching}`}</strong>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                    <Help />
                </Col>
            </Row>
        </div>
    );
}

function Help() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>This app demonstrates three features of the boilerplate:</Card.Text>
                <div
                    style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                        paddingTop: '5px',
                    }}
                >
                    <Card.Subtitle className="mb-2 text-muted">useCaching</Card.Subtitle>
                    <span>
                        <code>doAsync</code> takes a <code>useCaching</code> argument which will avoid trips to the API
                        for data that is already in Redux. To see this:
                        <ol>
                            <li>
                                go to settings page and turn on <code>useCaching</code>
                            </li>
                            <li>
                                navigate back to the users page; the API will be called again, but the call will be
                                recorded by the httpCache module (you can see all this happen in Redux DevTools)
                            </li>
                            <li>
                                {' '}
                                navigate away from users and come back; you won&apos;t see a busy indicator as the users
                                will now be in the redux cache and no async HTTP call is being made
                            </li>
                        </ol>
                    </span>
                    <Card.Subtitle className="mb-2 text-muted">noBusySpinner</Card.Subtitle>
                    <span>
                        <code>doAsync</code> also takes a <code>noBusySpinner</code> argument which will avoid trips to
                        the API for data that is already in Redux. To see this:
                        <ol>
                            <li>navigate to settings page</li>
                            <li>refresh the browser on the settings page</li>
                            <li>
                                after the settings page reloads enable the <code>noBusySpinner</code> checkbox
                            </li>
                            <li>
                                {' '}
                                navigate back to users page; you won&apos;t see a busy indicator while the data is
                                loading
                            </li>
                            <li>
                                repeat these steps and then quickly click the &quot;Reload with Busy Spinner&quot; which
                                will call <code>doAsync</code> again but with the <code>noBusySpinner</code> option set
                                to true. This will:
                                <ol>
                                    <li>
                                        determine that there is already an async HTTP request in progress and{' '}
                                        <em>not</em> call the API again
                                    </li>
                                    <li>
                                        determine that the busyIndicator isn&apos;t being shown when in fact it should,
                                        and will turn the busy indicator on
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </span>
                    <Card.Subtitle className="mb-2 text-muted">
                        NotificationPopups integration with doAsync
                    </Card.Subtitle>
                    <p>
                        This page is configured with both a <code>successMessage</code> and an <code>errorMessage</code>{' '}
                        when it calls <code>doAsync</code>. The <code>successMessage</code> displays a popup
                        notification with a &quot;Users loaded&quot; message upon successful loading of the data. To see
                        this in action, disconnect from the internet and refresh the page.
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
}
