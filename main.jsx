import React from 'react';
import {Accounts, STATES} from 'meteor/std:accounts-ui';
import {MuiButton, TextField, Snackbar} from 'material-ui';
import {green, red, yellow, lightBlue} from 'material-ui/colors';
import {socialButtonsStyles, socialButtonIcons} from './social_buttons_config';

const styles = {
  button: {
    marginRight: '6px',
  },
  buttonIcon: {
    marginRight: '6px',
  },
};

class LoginForm extends Accounts.ui.LoginForm {
  componentWillMount() {
    // FIXME hack to solve issue #18
  }
  componentWillUnmount() {
    // override, the default calls upon ReactMeteorData, which results
    // in a null ref to this._meteorDataManager
    // boy that was tricky to find.
  }
}

class Form extends Accounts.ui.Form {
  render() {
    const {
      oauthServices,
      fields,
      buttons,
      message,
      className,
      formState,
    } = this.props;

    return (
      <form
        noValidate
        autoComplete="off"
        ref={(ref) => { this.form = ref; }}
        className={['accounts', className].join(' ')}
      >
        {Object.keys(fields).length > 0
          ? (<Accounts.ui.Fields fields={fields} />)
          : null}
        <Accounts.ui.Buttons buttons={buttons} />
        <br />
        {formState === STATES.SIGN_IN || formState === STATES.SIGN_UP
          ? (
            <div className="or-sep">
              <Accounts.ui.PasswordOrService oauthServices={oauthServices} />
            </div>
          )
          : null}
        {formState === STATES.SIGN_IN || formState === STATES.SIGN_UP
          ? (<Accounts.ui.SocialButtons oauthServices={oauthServices} />)
          : null}
        <br />
        <Accounts.ui.FormMessage {...message} />
      </form>
    );
  }
}

class Buttons extends Accounts.ui.Buttons {}

class Button extends Accounts.ui.Button {
  render() {
    const {
      label,
      href = null,
      type,
      disabled = false,
      onClick,
      className,
      icon,
    } = this.props;
    const Icon = icon;

    return (
      <MuiButton
        variant={type === 'link' ? 'flat' : 'raised'}
        href={href}
        className={className}
        onClick={onClick}
        disabled={disabled}
        style={styles.button}
      >
        {Icon ? <Icon style={styles.buttonIcon} /> : ''}
        {label}
      </MuiButton>
    );
  }
}

class Fields extends Accounts.ui.Fields {
  render() {
    const {
      fields = {},
      className = '',
    } = this.props;
    return (
      <div className={[className].join(' ')}>
        {Object.keys(fields).map((id, i) => <Accounts.ui.Field key={i} {...fields[id]} />)}
      </div>
    );
  }
}

class Field extends Accounts.ui.Field {
  render() {
    const {
      id,
      hint,
      label,
      type = 'text',
      onChange,
      required = false,
      defaultValue = '',
      message = {message: '', type: 'info'},
    } = this.props;
    const {
      mount = true,
    } = this.state;

    return mount
      ? (
        <div>
          <TextField
            label={label}
            placeholder={hint}
            onChange={onChange}
            fullWidth
            defaultValue={defaultValue}
            name={id}
            type={type}
            ref={(ref) => { this.input = ref; }}
            required={!!required}
            InputProps={{
              inputProps: {
                autoCapitalize: type === 'email' ? 'none' : false,
                autoCorrect: 'off',
              },
            }}
          />
          <span className={['message', (message.type)].join(' ').trim()}>
            {message.message}
          </span>
        </div>
      )
      : null;
  }
}

class SocialButtons extends Accounts.ui.SocialButtons {
  render() {
    const {
      oauthServices = {},
      className = 'social-buttons',
    } = this.props;

    if (Object.keys(oauthServices).length > 0) {
      return (
        <div className={[className].join(' ')}>
          {Object.keys(oauthServices).map((id, i) => {
            const ServiceIcon = socialButtonIcons[id];

            const {
              label,
              type,
              onClick,
              disabled,
            } = oauthServices[id];

            const serviceClass = `oauth-service-${id}`;
            const style = Object.assign(socialButtonsStyles[id] || {}, styles.button);

            return (
              <MuiButton
                variant="raised"
                key={i}
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={serviceClass}
                style={style}
              >
                {ServiceIcon ? <ServiceIcon style={styles.buttonIcon} /> : ''}
                {label}
              </MuiButton>
            );
          })}
        </div>
      );
    }

    return null;
  }
}

class FormMessage extends Accounts.ui.FormMessage {
  state = {
    open: false,
  }

  static bodyStyleColor = {
    warning: yellow[600],
    success: green[500],
    error: red[500],
    info: lightBlue[600],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({open: true});
    }
  }

  handleRequestClose = () => {
    this.setState({open: false});
  }

  render() {
    const {message, type} = this.props;
    const {open} = this.state;
    const bodyStyle = {
      backgroundColor: this.constructor.bodyStyleColor[type],
    };

    return message
      ? (
        <Snackbar
          open={open}
          message={message}
          bodyStyle={bodyStyle}
          action="OK"
          autoHideDuration={4000}
          onActionTouchTap={this.handleRequestClose}
          onRequestClose={this.handleRequestClose}
        />)
      : null;
  }
}

// Notice! Accounts.ui.LoginForm manages all state logic at the moment, so avoid overwriting this
// one, but have a look at it and learn how it works. And pull requests altering how that works are
// welcome. Alter provided default unstyled UI.
Accounts.ui.LoginForm = LoginForm;
Accounts.ui.Form = Form;
Accounts.ui.Buttons = Buttons;
Accounts.ui.Button = Button;
Accounts.ui.Fields = Fields;
Accounts.ui.Field = Field;
Accounts.ui.FormMessage = FormMessage;
Accounts.ui.SocialButtons = SocialButtons;

// Export the themed version.
export {Accounts, STATES};
export default Accounts;
