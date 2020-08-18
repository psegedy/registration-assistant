import React, { useState } from 'react';

import './Register.scss';
import { FormTemplate as PfForm, componentMapper } from '@data-driven-forms/pf4-component-mapper';
import { Button } from '@patternfly/react-core/dist/esm/components/Button/index';
import { DataCollection, EnablingInsightsOnRhui, RegisterWithRhsm, SetupConfigure, SmartManagement, SubscribetoSatellite, schema } from './Helpers';
import { Divider } from '@patternfly/react-core/dist/esm/components/Divider/index';
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody,
    DrawerHead, DrawerPanelBody, DrawerPanelContent } from '@patternfly/react-core/dist/esm/components/Drawer/';
import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/esm/components/Page/';
import { Title } from '@patternfly/react-core/dist/esm/components/Title/index';
import { TasksIcon, ColumnsIcon } from '@patternfly/react-icons/dist/esm/icons/';
import { TextContent } from '@patternfly/react-core/dist/esm/components/Text/index';
import Group from '../../Components/Group/Group';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import FormSpy from '@data-driven-forms/react-form-renderer/dist/esm/form-spy';
import PropTypes from 'prop-types';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

const CustomSection = ({ label }) => <React.Fragment>{label}</React.Fragment>;

CustomSection.propTypes = {
    label: PropTypes.any
};

const insRaMapper = {
    ...componentMapper,
    'custom-section': { component: CustomSection }
};

const Register = () => {
    const intl = useIntl();

    const [isExpanded, setIsExpanded] = useState(false);

    const onOpenClick = () => {
        setIsExpanded(true);
    };

    const onCloseClick = () => {
        setIsExpanded(false);
    };

    const panelContent = (
        <DrawerPanelContent className="ins-m-light-300" hasNoBorder noPadding>
            <ul aria-label="Red Hat Insights tips">
                <li>
                    <DrawerHead>
                        <Group type='title-group'>
                            <TasksIcon size='md' />
                            <Title headingLevel='h3' size="md">
                                {intl.formatMessage(messages.preinstallationChecks)}
                            </Title>
                        </Group>
                        <DrawerActions>
                            <DrawerCloseButton onClick={onCloseClick} />
                        </DrawerActions>
                    </DrawerHead>
                    <DrawerPanelBody>
                        <FormSpy>
                            {({ values }) => values['how-are-systems-managed'] === 'rhsm' ? (
                                <RegisterWithRhsm intl={intl} />
                            ) : values['how-are-systems-managed'] === 'rhs' ?
                                <SubscribetoSatellite intl={intl} />
                                : <EnablingInsightsOnRhui intl={intl} />
                            }
                        </FormSpy>
                    </DrawerPanelBody>
                </li>
                <Divider component='li' />
                <li>
                    <DrawerPanelBody>
                        <DataCollection intl={intl} />
                    </DrawerPanelBody>
                </li>
                <Divider component='li' />
                <li>
                    <DrawerPanelBody>
                        <SetupConfigure intl={intl} />
                    </DrawerPanelBody>
                </li>
                <Divider component='li' />
                <li>
                    <FormSpy>
                        {({ values }) => values['how-are-systems-managed'] !== 'rhs' ? <DrawerPanelBody>
                            <SmartManagement intl={intl} />
                        </DrawerPanelBody> : null
                        }
                    </FormSpy>
                </li>
                <Divider component='li' />
                <li aria-hidden="true">
                    <DrawerPanelBody>
                    </DrawerPanelBody>
                </li>
            </ul>
        </DrawerPanelContent>
    );

    const FormTemplate = props =>
        <PageSection className='ins-c-registration-assistant ins-c-overflow-content'
            variant={PageSectionVariants.light} padding={{ default: 'noPadding' }}>
            <Drawer className='ins-c-registration-assistant-drawer' isStatic isExpanded={isExpanded}>
                <DrawerContent panelContent={panelContent}>
                    <DrawerContentBody hasPadding>
                        <Group type='page-title'>
                            <TextContent>
                                <div className="ins-c-page-title__main">
                                    <Title headingLevel='h1' size="xl">
                                        {intl.formatMessage(messages.registerYourSystems)}
                                    </Title>
                                    <Button aria-expanded={isExpanded} onClick={onOpenClick}>
                                        <ColumnsIcon />
                                    </Button>
                                </div>
                                <Title className="ins-c-step-title" headingLevel='h2' size='md'>
                                    {intl.formatMessage(messages.stepOneTitle)}
                                </Title>
                            </TextContent>
                        </Group>
                        <div className='ins-c-registration-assistant-form'>
                            <PfForm {...props}/>
                        </div>
                    </DrawerContentBody>
                </DrawerContent>
            </Drawer>
        </PageSection>;

    return <FormRenderer
        schema={schema(intl)}
        componentMapper={insRaMapper}
        FormTemplate={props => <FormTemplate {...props} showFormControls={false} />} />;
};

Register.propTypes = {
    formFields: PropTypes.object
};

export default withRouter(Register);