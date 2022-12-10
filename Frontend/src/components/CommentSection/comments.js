import React, { useEffect, useState } from "react";
import "./comment.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";

function Comments(props) {
  const pid = props.id;
  const [mdal, setModal] = useState(false);
  const [pdesc, setpdesc] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/comments/${props.id}/comments`
        )
      ).data;
      setpdesc(response.desc);
    }
    fetchData();
  }, [props.id]);

  const submitHandler = async (e) => {
    let update;

    e.preventDefault();
    const updatedComment = {
      userId: "611b74dd16f8353848675308",
      desc: pdesc,
      uname: "Liam Livingstone",
    };

    try {
      update = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/comments/edit/${pid}`,
        updatedComment
      );

      if (update) {
        window.alert("Your Comment has been updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    let deletion;

    if (window.confirm("Are you sure about deleting this comment?")) {
      deletion = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/comments/delete/${id}`
      );
    }
    //const deletion = await axios.delete(`${process.env.REACT_APP_BASE_URL}/customers/delete/${id}`);
    if (deletion) {
      window.alert("Comment has been deleted");
    } else {
      window.alert("Sorry! You can only delete your comments");
    }
  };

  return (
    <div>
      <Modal
        isOpen={mdal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "transparent",
            marginTop: "120px",
            width: "30%",
            height: "245px",
            marginLeft: "30%",
          },

          content: {
            borderRadius: "20px",
            color: "white",
            background: "#373B44",
          },
        }}
      >
        <p1>Edit Comment</p1>
        <Form onSubmit={submitHandler}>
          <Form.Control
            type="text"
            value={pdesc}
            onChange={(e) => {
              setpdesc(e.target.value);
            }}
          />
          <Button
            variant="primary"
            onClick={() => setModal(false)}
            styles={{ color: "white" }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal>

      <div className="commentcontainer">
        <div className="commentsbox">
          <div className="commentboxwrapper">
            <p className="author">{props.author}</p>
            <p className="commentbox">
              {props.desc}
              <div className="deled">
                <EditIcon onClick={() => setModal(true)} />
                <DeleteIcon onClick={() => deleteComment(props.id)} />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
