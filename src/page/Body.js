import React, {Component} from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';

class Body extends Component{
	constructor(props){
		super(props)
		this.state = {
			dataKaryawan : [],
			valueSearch: '',
			inputId : '',
			inputNama : '',
			inputJabatan : '',
			inputJK : '',
			inputDob : ''
		}

		this.panggilSemua = this.panggilSemua.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.clearInput = this.clearInput.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleSearch(e){
		this.setState({valueSearch: e.target.value})
	}

	handleDelete(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`, {
			method: 'DELETE'
		}).then(response => {
			alert('data sudah terhapus')
			this.panggilSemua()
		})
	}

	handleSave(){
		if(this.state.inputNama === "" || this.state.inputJabatan === "" || this.state.inputJK === "" || this.state.inputDob === ""){
			alert('Silahkan isi data terlebih dahulu')
		}else if(this.state.inputId === ""){
			fetch('http://localhost:3000/data-karyawan',{
				method: 'POST',
				body : JSON.stringify({
					nama_karyawan : this.state.inputNama,
					jabatan : this.state.inputJabatan,
					jenis_kelamin : this.state.inputJK,
					tanggal_lahir : this.state.inputDob,
				}), headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then ((response) => response.json())
			  .then((hasil) => {
			  	alert("Data Berhasil Tersimpan")
			  	this.closeModal()
				this.panggilSemua()
			  })
		}else{
			fetch(`http://localhost:3000/data-karyawan/${this.state.inputId}`,{
				method : 'PUT',
				body : JSON.stringify({
					nama_karyawan : this.state.inputNama,
					jabatan : this.state.inputJabatan,
					jenis_kelamin : this.state.inputJK,
					tanggal_lahir : this.state.inputDob,
				}), headers : {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((response) => response.json())
			  .then((hasil) => {
			  	this.panggilSemua()
			  	this.props.setModalShow()
			  	this.clearInput()
			  })
		}
	}

	handleEdit(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`
		).then((response) => response.json())
		 .then((hasil) => {
		  		console.log(hasil)
		  		this.setState({
		  			inputNama : hasil.nama_karyawan,
		  			inputJabatan : hasil.jabatan,
		  			inputJK : hasil.jenis_kelamin,
		  			inputDob : hasil.tanggal_lahir,
		  			inputId : hasil.id
		  		})
		  	})
	}

	handleInput(value,e){
		this.setState({[value] : e.target.value})
	}	

	panggilSemua(){
		fetch('http://localhost:3000/data-karyawan')
			.then((response) => response.json())
			.then((hasil) => this.setState({dataKaryawan : hasil}))
	}

	componentDidMount(){
		this.panggilSemua()
	}

	closeModal(){
		this.props.setModalShow(false)
		this.clearInput()
	}

	clearInput(){
		this.setState({inputNama: "", inputJabatan: "", inputJK:"", inputDob : "", inputId : ""})
	}

	render(){
		return(
			<Container>
				<Row style={{marginTop:'30px'}}>
					<Col lg={3}>
						<Form.Control type="text" value={this.state.inputId} placeholder="Masukkan ID" onChange = {(e) => this.handleInput("inputId",e)}/>
					</Col>
					<Col lg={3}>
						<Form.Control type="text" value={this.state.inputNama} placeholder="Masukkan Nama Karyawan" onChange = {(e) => this.handleInput("inputNama",e)}/>
					</Col>
					<Col lg={3}>
						<Form.Control type="text" value={this.state.inputJabatan} placeholder="Masukkan Jabatan" onChange = {(e) => this.handleInput("inputJabatan",e)}/>
					</Col>
					<Col lg={3}>
						<Form.Control type="text" value={this.state.inputJK} placeholder="Masukkan Jenis Kelamin" onChange = {(e) => this.handleInput("inputJK",e)}/>
					</Col>
					<Col lg={3}>
						<Form.Control type="date" value={this.state.inputDob} placeholder="mm/dd/yy" onChange = {(e) => this.handleInput("inputDob",e)}/>
					</Col>
					<Col lg={2}>
						<Button variant="primary" onClick={(e)=>this.handleSave(e)}>Tambah Data</Button>
					</Col>
				</Row>
				<Row>
					{this.state.dataKaryawan.reverse().map((item,i) => {
						return(
							<Card key={i} style={{width:'300px', marginTop: '30px', marginLeft: '20px'}}>
									<Card.Img variant="top" src={item.linkgambar}/>
									<Card.Body>
										<Card.Title>Nama : {item.nama_karyawan}</Card.Title>
										<Card.Text>Jabatan : {item.jabatan}</Card.Text>
										<Card.Text>Jenis Kelamin : {item.jenis_kelamin}</Card.Text>
										<Card.Text>Tanggal Lahir : {item.tanggal_lahir}</Card.Text>
									</Card.Body>
									<Card.Footer>
										<Button style={{marginRight: '5%'}} variant="outline-danger" onClick={()=>this.handleDelete(item.id)}>Hapus</Button>
										<Button variant="outline-primary" onClick={()=> this.handleEdit(item.id)}>Edit</Button>
									</Card.Footer>
								</Card>
						)
					})}
				</Row>
			</Container>
		)
	}
}

export default Body;