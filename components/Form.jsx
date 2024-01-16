import React from 'react'
import Link from 'next/link'
const Form = ({
    type, post, setPost, submitting, handleSubmit}) => {

  return (
    //max-w-full：这个类名设置元素的最大宽度为 100%。这意味着元素的宽度不会超过其父元素的宽度3。
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} Post</span>
        </h1>

        <p className='desc text-left max-w-md'>
            {type} and share amazing prompts norms for LLm
        </p>

        <form
            onSubmit={handleSubmit}
            className='mt-10 w-full max-w-2xl flex
            flex-col gap-7 glassmorphism'
        >
            <label>
                <span className='font-satoshi font-semibold
                text-base text-grap-700'>
                    Your AI Prompt
                </span>

                <textarea
                    value={post.prompt}
                    onChange={(e)=> setPost({...post,
                    prompt: e.target.value})}
                    placeholder='Write your prompt here...'
                    required
                    className='form_textarea'
                >
                    
                </textarea>

            </label>

            <label>
                <span className='font-satoshi font-semibold
                text-base text-grap-700'>
                    Tag{` `}
                    <sapn className='font-normal'>(#product,
                    #webdev, #idea)</sapn>
                </span>

                <input
                    value={post.tag}
                    onChange={()=> setPost({...post,
                    tag: e.target.value})}
                    placeholder='#tag'
                    required
                    className='form_input'
                >
                    
                </input>

            </label>

            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm'>
                Cancel
                </Link>

                <button
                    type="submit"
                    disabled={submitting}
                    className='px-5 py-1.5 text-sm
                    bg-primary-orange rounded-full text-white'
                >
                    {submitting ? `${type}...`: type}
                </button>
            </div>


        </form>
        
    </section>
  )
}

export default Form