'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import{useSession} from 'next-auth/react';
import Form from "@component/Form";

function CreatePrompt() {
	const router = useRouter();
	const {data:session} = useSession();
const [submitting, setSubmitting] = useState(false);
const [post,setPost] = useState({
	prompt:'',
	tag:'',
});

const CreatePrompt = async(e)=>{
	e.preventDefault();
	setSubmitting(true);

	try {
		const response = await fetch('/api/prompt/new',{
			method:'post',
			body:JSON.stringify({
				prompt:post.prompt,
				userId:session?.user.id,
				tag:post.tag,
			})
		})
		if(response.ok){
			router.push('/')
		}
	} catch (error) {
		console.log(error);


	}
	finally{
		setSubmitting(false);
	}

}

  return (
	<Form
	type='Create'
	post={post}
	setPost={setPost}
	submitting={submitting}
	handleSubmit={CreatePrompt}


	/>
  )

}

export default CreatePrompt;
