import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import {clearErrors} from "../../actions/errorActions";


class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            email: '',
            password: '',
            message: null
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error)
        {
            //check for register error
            if(error.id === 'REGISTER_FAIL')
            {
                this.setState({message: error.message.message})
            }
            else
            {
                this.setState({message: null})
            }
        }

        // If isAuthenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {name, email, password} = this.state;

        //Create user object
        const newUser = {
            name,
            email,
            password
        }

        //Attempt to register
        this.props.register(newUser);
    }


    render() {
        return(
            <div>
                <NavLink
                onClick={this.toggle} href="#"
                >
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.message && <Alert color="danger">{this.state.message}</Alert>}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="name">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="name">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal);